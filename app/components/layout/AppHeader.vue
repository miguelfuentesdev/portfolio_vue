<script setup lang="ts">
const { isOpen, toggleMenu, closeMenu } = useMobileMenu(); 
</script>

<template>
  <header class="w-full flex items-center justify-between app-container relative py-12">
    <NavbarMobile />
    <Navbar />
    <ThemeToggle />
  </header>
</template>
