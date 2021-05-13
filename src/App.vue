<template>
  <div>
    <navigation-bar v-on:change-logged-in="updateLogeedInStatus($event)" :loggedIn="logeedIn"></navigation-bar>
    <router-view v-on:change-logged-in="updateLogeedInStatus($event)"></router-view>
    <footer-bar></footer-bar>
  </div>
</template>

<script>
// @ is an alias to /src
import NavigationBar from '@/components/NavigationBar.vue'
import FooterBar from '@/components/FooterBar.vue'

export default {
    name: 'App',
    components: {
        NavigationBar,
        FooterBar
    },
    data() {
      return {
        logeedIn: this.$session.exists(),
      }
    },
    methods: {
      updateLogeedInStatus(event) {
        this.logeedIn = event
      }
    }
}
</script>

<style>
</style>