<template>
  <div class="lds-spinner">
    <div :class="styles.spinnerItem"></div>
    <div :class="styles.spinnerItem"></div>
    <div :class="styles.spinnerItem"></div>
    <div :class="styles.spinnerItem"></div>
    <div :class="styles.spinnerItem"></div>
    <div :class="styles.spinnerItem"></div>
    <div :class="styles.spinnerItem"></div>
    <div :class="styles.spinnerItem"></div>
    <div :class="styles.spinnerItem"></div>
    <div :class="styles.spinnerItem"></div>
    <div :class="styles.spinnerItem"></div>
    <div :class="styles.spinnerItem"></div>
  </div>
</template>

<script setup lang="ts">
import { style } from '@apathia/apathia.twind'

defineOptions({
  name: 'Loading',
})

const getStyles = () => ({
  spinnerItem: style`after:bg-brand-primary`,
})

const styles = getStyles()
</script>
