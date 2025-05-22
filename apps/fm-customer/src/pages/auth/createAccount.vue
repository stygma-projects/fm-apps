<template>
    <div class="items-center flex flex-col">
        <Form @submit="onSubmit" class="p-5 flex flex-col border-solid border-1 border-gray-300 rounded-lg shadow-md" :validation-schema="schema" @invalid-submit="onInvalidSubmit">
            
            <h1 class="text-2xl mb-5">Création de compte</h1>
            
            <h2 class="mb-2">Email : </h2>
            <Field class="border-solid border-1 border-gray-300 shadow-md mb-2" name="email" type="email" v-bind="emailAttrs" placeholder="aah"/>

            <h2 class="mb-2">Mot de passe (au moins 8 caractères) : </h2>
            <Field class="border-solid border-1 border-gray-300 shadow-md mb-2" name="password" type="password" v-model="password" v-bind="passwordAttrs" placeholder="aah"/>

          <button class="mb-2 border-1 border-gray-300 rounded-lg shadow-md mx-auto w-auto pl-2 pr-2 pt-1 pb-1">Submit</button>
          <button class="mb-2 border-1 border-gray-300 rounded-lg shadow-md mx-auto w-auto pl-2 pr-2 pt-1 pb-1">Connect</button>
        </Form>
    </div>
</template>

<script setup>
import { Form, Field } from 'vee-validate';
// import { useToast } from '../../composables/utils/toast.composable';
import * as yup from 'yup';

const { successToast } = useToast();

const schema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required().min(8),
});

function onSubmit(values) {
  alert(JSON.stringify(values, null, 2));
}

function onInvalidSubmit({ values, errors, results }) {
    successToast('danger', 'Invalid form submission');
    console.log('Invalid form submission', { values, errors, results });
}
</script>