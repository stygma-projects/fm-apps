<template>
    <div class="items-center flex flex-col">
        <Form @submit="onSubmit" class="p-5 flex flex-col border-solid border-1 border-gray-300 rounded-lg shadow-md" :validation-schema="schema" @invalid-submit="onInvalidSubmit">
            
            <h1 class="text-2xl mb-5">Création de compte</h1>

            <h2 class="mb-2">Nom : </h2>
            <Field class="border-solid border-1 border-gray-300 shadow-md mb-2" name="name" placeholder="Ex : Blank"/>
            
            <h2 class="mb-2">Email : </h2>
            <Field class="border-solid border-1 border-gray-300 shadow-md mb-2" name="email" type="email" placeholder="Ex : blank@gmail.com"/>

            <h2 class="mb-2">Mot de passe (au moins 8 caractères) : </h2>
            <Field class="border-solid border-1 border-gray-300 shadow-md mb-2" name="password" type="password" placeholder=" Ex : D$1\\>0h1j4WO%_7oZ3e"/>

          <button class="mb-2 border-1 border-gray-300 rounded-lg shadow-md mx-auto w-auto pl-2 pr-2 pt-1 pb-1">Submit</button>
          <button class="mb-2 border-1 border-gray-300 rounded-lg shadow-md mx-auto w-auto pl-2 pr-2 pt-1 pb-1">Connect</button>
        </Form>
    </div>
</template>

<script setup>
import { Form, Field } from 'vee-validate';
import { useUser } from '../../composables/api/user.composable';
import * as yup from 'yup';

const { signUpByMailAndPassword } = useUser();

const schema = yup.object({
  name: yup.string().required(),
  email: yup.string().required().email(),
  password: yup.string().required().min(8),
});

async function onSubmit(values) {
  try {
    const response = await signUpByMailAndPassword.mutate(values)
    console.log('Réponse mutation:', response)
    // Affiche un message de succès ou redirige
  } catch (error) {
    console.error('Erreur mutation:', error)
    // Affiche un message d’erreur à l’utilisateur
  }
}

function onInvalidSubmit({ values, errors, results }) {
    console.log('Invalid form submission', { values, errors, results });
}
</script>