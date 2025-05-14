<template>
	<div class="min-h-screen bg-rose-50">
		<header class="bg-yellow-300 shadow-sm py-3">
			<div class="container mx-auto px-4">
				<h1 class="text-xl font-bold">{{ t('common.header') }}</h1>
			</div>
		</header>
		
		<main class="container mx-auto py-6 px-4">
			<slot />
		</main>
		
		<footer class="bg-yellow-300 py-4 mt-8">
			<div class="container mx-auto px-4 text-center text-sm">
				{{ t('common.footer') }}
			</div>
		</footer>
	</div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>