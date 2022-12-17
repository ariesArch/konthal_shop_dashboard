<template>
  <div>
    <h1>Shop-{{ $auth.user.current_shop.name }}</h1>
    <NuxtChild />
  </div>
</template>
<script>
export default {
  layout: 'shop'
}
</script>
