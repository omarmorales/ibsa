<template>
  <div class="Navbar">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">IBSA</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <router-link to="/" class="nav-link">Inicio</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/about" class="nav-link">Acerca</router-link>
                    </li>
                </ul>
                <form class="form-inline my-2 my-lg-0">

                    <button class="btn btn-outline-success my-2 my-sm-0" type="button" data-toggle="modal" data-target="#login">Iniciar sesión</button>
                </form>
            </div>
        </nav>
        <Login />
  </div>
</template>

<script>
import Login from './Login';
export default {
  name: "Navbar",
  props: {
    msg: String
  },
  components: {
      Login
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>