<template>
  <div class="items-center flex flex-col">
    <Form @submit="onSubmit" class="p-5 flex flex-col border-solid border-1 border-gray-300 rounded-lg shadow-md">
        
        <h1 class="text-2xl mb-5">{{ t('createAccount.form.title') }}</h1>

        <h2 class="mb-2">{{ t('createAccount.form.name') }}</h2>
        <input class="border-solid border-1 border-gray-300 shadow-md mb-2" name="name" v-model="name" v-bind="nameAttrs" :placeholder="t('createAccount.form.nameExample')" />
        
        <h2 class="mb-2">{{ t('createAccount.form.email') }}</h2>
        <input class="border-solid border-1 border-gray-300 shadow-md mb-2" name="email" type="email" v-model="email" v-bind="emailAttrs" :placeholder="t('createAccount.form.emailExample')"/>

        <h2 class="mb-2">{{ t('createAccount.form.password') }}</h2>
        <input class="border-solid border-1 border-gray-300 shadow-md mb-2" name="password" type="password" v-model="password" v-bind="passwordAttrs" :placeholder="t('createAccount.form.passwordExample')"/>

      <button type="submit" class="mt-5 border-1 border-gray-300 rounded-lg shadow-md mx-auto w-auto pl-2 pr-2 pt-1 pb-1">{{ t('createAccount.form.submit') }}</button>

      <h2 class="mt-10 text-center">{{ t('createAccount.form.alreadyHaveAccount') }}</h2>
      <button type="button" class="mt-5 border-1 border-gray-300 rounded-lg shadow-md mx-auto w-auto pl-2 pr-2 pt-1 pb-1">{{ t('createAccount.form.login') }}</button>
    </Form>
  </div>
</template>


<script setup>
import { useForm, Form } from 'vee-validate';
import { useUser } from '../../composables/api/user.composable';
import * as yup from 'yup';
import isEmailValidator from 'validator/lib/isEmail';
import { useToast } from '../../composables/utils/toast.composable'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const { successToast, errorToast } = useToast()
const { signUpByMailAndPassword } = useUser();

const { handleSubmit, defineField } = useForm({
  validationSchema: yup.object({
    name: yup.string().required(),
    email: yup.string().email().required().test("is-valid", (message) => `${message.path} is invalid`, (value) => value ? isEmailValidator(value) : new yup.ValidationError("Invalid value")),
    password: yup.string().min(8).required(),
  }),
});


async function onSuccess(values) {
  try {
    await signUpByMailAndPassword.mutate(values)
    successToast(t('createAccount.toast.success'), t('createAccount.toast.accountCreated'));
  } catch (error) {
    errorToast(t('createAccount.toast.registerError'), error.message || t('createAccount.toast.defaultError'));
  }
};

async function onInvalidSubmit({errors}) {
    for (const error of Object.values(errors)) {
      errorToast(t('createAccount.toast.error'), error || t('createAccount.toast.defaultParameterError'));
    }
};

const onSubmit = handleSubmit(onSuccess, onInvalidSubmit);

const [name, nameAttrs] = defineField('name');
const [email, emailAttrs] = defineField('email');
const [password, passwordAttrs] = defineField('password');
</script>