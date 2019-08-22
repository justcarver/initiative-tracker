<template>
  <div id="app">
    <nav class="flex items-center justify-between flex-wrap bg-blue-500 p-6">
      <div class="flex items-center flex-shrink-0 text-white mr-6">
        <span class="font-semibold text-xl tracking-tight">
          Initiative Tracker
        </span>
      </div>
      <div class="flex items-center">
        <div class="text-sm">
          <router-link
            to="/"
            class="block inline-block lg:mt-0 text-blue-200 hover:text-white mr-4"
          >
            Home
          </router-link>
          <router-link
            to="/about"
            class="block inline-block lg:mt-0 text-blue-200 hover:text-white mr-4"
          >
            About
          </router-link>
        </div>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
