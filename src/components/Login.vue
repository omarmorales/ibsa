<template>
  <div class="login">
        <!-- Modal -->
        <div class="modal fade" id="login" tabindex="-1" role="dialog" aria-labelledby="loginTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-body">
                        <ul class="nav nav-fill nav-pills mb-3" id="pills-tab" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-login" role="tab" aria-controls="pills-login" aria-selected="true">
                                    Iniciar sesión
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="pills-register-tab" data-toggle="pill" href="#pills-register" role="tab" aria-controls="pill-register" aria-selected="false">
                                    Registrarse
                                </a>
                            </li>
                        </ul>
                        <div class="tab-content" id="pills-TabContent">
                            <div class="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="pills-login-tab">
                                <h5 class="text-center">Iniciar sesión</h5>
                                <div class="form-group">
                                    <label for="exampleInputEmail1">Correo electrónico</label>
                                    <input type="email" v-model="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Ingresar correco electrónico">
                                    <small class="form-text text-muted">En ningún momento se compartirá tu información con terceros..</small>
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputPassword1">Contraseña</label>
                                    <input type="password" @keyup.enter="login" v-model="password" class="form-control" id="exampleInputPassword1" placeholder="Contraseña">
                                </div>

                                <div class="form-group">
                                    <button class="btn btn-primary" @click="login">Iniciar sesión</button>
                                </div>
                            </div>
                            <div class="tab-pane fade" id="pills-register" role="tabpanel" aria-labelledby="pills-register-tab">
                                <h5 class="text-center">Crear cuenta</h5>
                             
                                <div class="form-group">
                                    <label for="name">Nombre</label>
                                    <input type="text" v-model="name" class="form-control" id="name" placeholder="Nombre completo">
                                </div>

                                <div class="form-group">
                                    <label for="email">Correo electrónico</label>
                                    <input type="email"  v-model="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Ingresa tú correo electrónico">
                                </div>
                                <div class="form-group">
                                    <label for="password">Contraseña</label>
                                    <input type="password" v-model="password" class="form-control" id="password" placeholder="Contraseña">
                                </div>

                                <div class="form-group">
                                    <button class="btn btn-primary" @click="register">Registrarse</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
import {fb} from '../firebase'
export default {
  name: "Login",
  props: {

  },
  data() {
      return {
          name:null,
          email:null,
          password:null,
      }
  },
  methods:{
    login(){
        fb.auth().signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
            $('#login').modal('hide')
            toast.fire({
                type: 'success',
                title: 'Successfully logged in'
            })
            this.$router.replace('admin');
        })
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === 'auth/wrong-password') {
                toast.fire({
                    type: 'error',
                    title: 'Wrong password'
                })
            } else {
                toast.fire({
                    type: 'error',
                    title: errorMessage
                })
            }
        });
    },
    register(){
        fb.auth().createUserWithEmailAndPassword(this.email, this.password)
        .then((user) => {
            $('#login').modal('hide')
            this.$router.replace('admin');
            toast.fire({
                type: 'success',
                title: 'User registered successfully'
            })
        })
        .catch(function(error) {
        // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == 'auth/weak-password') {
                toast.fire({
                    type: 'error',
                    title: 'Password is too weak'
                })
            } else {
                toast.fire({
                    type: 'error',
                    title: errorMessage
                })
            }
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>