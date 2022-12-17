<template>
  <div>
    <h1>{{ $auth.user.current_shop.name }}</h1>
    {{ $route.pathname }}
    <NuxtChild />
  </div>
</template>
<script>
export default {
  layout: 'shop'
}
</script>
