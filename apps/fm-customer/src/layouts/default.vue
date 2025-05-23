<template>
	<div class="h-screen flex flex-col bg-rose-50">
		<header 
			data-cy="fmc-header"
			class="flex-shrink-0 py-3 bg-yellow-300 shadow-sm">
			<div class="container px-4 mx-auto">
				<h1 class="text-xl font-bold text-rose-700">{{ t('common.header') }}</h1>
			</div>
		</header>
		
		<main class="flex-1 overflow-hidden">
			<slot />
		</main>
		
		<!-- <footer 
			data-cy="fmc-footer"
			class=" py-4 bg-yellow-300">
			<div class="container px-4 mx-auto text-sm text-center text-rose-700">
				{{ t('common.footer') }}
			</div>
		</footer> -->
	</div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>