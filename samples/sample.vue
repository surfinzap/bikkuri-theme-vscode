<template lang="pug">
  .container
    h1 Nuxt.js Example
    p Welcome to my Nuxt.js example page!
    button(@click="increment") Click me

    div.card
      h2 Card Title
      p Card Content

    div.card
      h2 Card Title 2
      p Card Content 2

    button.btn.btn--dark.btn--icon.btn--sm(
      @click='toggleSettings'
      aria-label='Settings'
      :class='showSettings ? "btn--selected-clickable" : null'
      ) 
      icons-cog-6-tooth

    settings(
      v-if='showSettings'
      @closeSettings='toggleSettings($event)'
    )

</template>

<script>
export default {
  data() {
    return {
      count: 0
    }
  },
  methods: {
    increment() {
      this.count++
    },
    openHelp() {
      this.showHelp = true;
      let element = document.querySelector('body')
      element.classList.add('freeze-scroll')
      sa_event('openHelp');
    },
  }
}
</script>

<style lang="scss">
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  h1 {
    font-size: 32px;
    margin-bottom: 20px;
  }
  p {
    font-size: 18px;
    line-height: 1.5;
    margin-bottom: 20px;
  }
  button {
    background-color: #0077cc;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    &:hover {
      background-color: #005c99;
    }
  }
  .card {
    background-color: #f2f2f2;
    border-radius: 4px;
    padding: 20px;
    margin-top: 40px;
    h2 {
      font-size: 24px;
      margin-bottom: 10px;
    }
    p {
      font-size: 16px;
      line-height: 1.5;
    }
  }
}
</style>
