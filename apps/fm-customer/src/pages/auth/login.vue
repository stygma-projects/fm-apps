<template>
  <div class="items-center flex flex-col">
    <Form @submit="onSubmit" class="p-5 flex flex-col border-solid border-1 border-gray-300 rounded-lg shadow-md">
        
        <h1 class="text-2xl mb-5">{{ t('login.form.title') }}</h1>

        <h2 class="mb-2">{{ t('login.form.email') }}</h2>
        <input class="border-solid border-1 border-gray-300 shadow-md mb-2" name="email" type="email" v-model="email" v-bind="emailAttrs" :placeholder="t('login.form.emailExample')"/>

        <h2 class="mb-2">{{ t('login.form.password') }}</h2>
        <input class="border-solid border-1 border-gray-300 shadow-md mb-2" name="password" type="password" v-model="password" v-bind="passwordAttrs" :placeholder="t('login.form.passwordExample')"/>

      <button type="submit" class="mt-5 border-1 border-gray-300 rounded-lg shadow-md mx-auto w-auto pl-2 pr-2 pt-1 pb-1">{{ t('login.form.submit') }}</button>

      <h2 class="mt-10 text-center">{{ t('login.form.noAccount') }}</h2>
      <NuxtLink to="./../auth/create-account" data-cy="fmc-order-button" class="mt-5 border-1 border-gray-300 rounded-lg shadow-md mx-auto w-auto pl-2 pr-2 pt-1 pb-1"> {{ t('login.form.createAccount') }} </NuxtLink>
    </Form>
  </div>
</template>


<script setup>
import { computed } from 'vue';
import { useForm, Form } from 'vee-validate';
import { useUser } from '../../composables/api/user.composable';
import * as zod from 'zod';
import { toTypedSchema } from '@vee-validate/zod';
import { useToast } from '../../composables/utils/toast.composable';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router'


const router = useRouter()
const { t } = useI18n();
const { successToast, errorToast } = useToast();
const { signInByMailAndPassword } = useUser();
const { setUserValues } = useUserStore();

const { handleSubmit, defineField } = useForm({
  validationSchema : toTypedSchema(
    zod.object({
      email: zod.string().nonempty({ message: t('login.form.errors.emailRequired') }).email({ message: t('login.form.errors.invalidEmail') }),
      password: zod.string().nonempty({ message: t('login.form.errors.passwordRequired')}),
    })
  ),
  initialValues: {
    email: '',
    password: ''
  }
});

async function onSuccess(values) {
  try {
    const response = await signInByMailAndPassword.mutate({
      email : values.email,
      password : values.password,
    })
    successToast(t('login.toast.success'), t('login.toast.accountCreated'));
    setUserValues(response.token, response.user);
    router.push('../../')
  } catch (error) {
    if (error.message === 'Invalid email or password') {
      errorToast(t('login.toast.registerError'), t('login.form.errors.invalidEntries'));
      return;
    }
    errorToast(t('login.toast.registerError'), error.message || t('login.toast.defaultError'));
  }
};

async function onInvalidSubmit({errors}) {
    for (const error of Object.values(errors)) {
      errorToast(t('login.toast.error'), error || t('login.toast.defaultParameterError'));
    }
};

const onSubmit = handleSubmit(onSuccess, onInvalidSubmit);

const [email, emailAttrs] = defineField('email');
const [password, passwordAttrs] = defineField('password');
</script>