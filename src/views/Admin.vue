<template>
  <div class="admin">
      <div class="page-wrapper default-theme sidebar-bg bg1 toggled">
        <a id="show-sidebar" @click="closeMenu" class="btn btn-sm btn-dark" href="#">
            <i class="fas fa-angle-right"></i>
        </a>
        <nav id="sidebar" class="sidebar-wrapper">
            <div class="sidebar-content">
                <!-- sidebar-brand  -->
                <div class="sidebar-item sidebar-brand">
                    <a href="#">Abarrotes IBSA</a>
                    <div id="close-sidebar" @click="closeMenu">
                        <i class="fas fa-angle-left"></i>
                    </div>
                </div>
                <!-- sidebar-header  -->
                <div class="sidebar-item sidebar-header">
                    <!-- <div class="user-pic">
                        <img class="img-responsive img-rounded" src="/img/user.png" alt="User picture">
                    </div> -->
                    <div class="user-info">
                        <span class="user-name">Omar
                            <strong>Morales</strong>
                        </span>
                        <!-- <span class="user-role"> email </span>
                        <span class="user-status">
                            <i class="fa fa-circle"></i>
                            <span>Online</span>
                        </span> -->
                    </div>
                </div>
                <!-- sidebar-search  -->
                <div class="sidebar-item sidebar-search">
                    <div>
                        <div class="input-group">
                            <input type="text" class="form-control search-menu" placeholder="Buscar...">
                            <div class="input-group-append">
                                <span class="input-group-text">
                                    <i class="fa fa-search" aria-hidden="true"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- sidebar-menu  -->
                <div class="sidebar-item sidebar-menu text-left">
                    <ul>
                        <li class="header-menu">
                            <span>Menú</span>
                        </li>

                        <li>
                            <router-link to="/admin/overview">
                                <i class="fa fa-chart-line"></i>
                                <span>General</span>
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/admin/promos">
                                <i class="fa fa-tag"></i>
                                <span>Promociones</span>
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/admin/profile">
                                <i class="fa fa-user"></i>
                                <span>Perfil</span>
                            </router-link>
                        </li>
                        <li>
                            <a href="#" @click="logout()">
                                <i class="fa fa-power-off"></i>
                                <span>Cerrar sesión</span>
                            </a>
                        </li>
                    </ul>
                </div>
                <!-- sidebar-menu  -->
            </div>
       
        </nav>
        <!-- sidebar-content  -->
        <main class="page-content">
            <router-view/>
        </main>
        <!-- page-content" -->
    </div>
    <!-- page-wrapper -->


  </div>
</template>

<script>
// @ is an alias to /src
import {fb} from '../firebase'
import Hero from "@/components/Hero.vue";
import { log } from 'util';

export default {
  name: "admin",
  components: {
    Hero
  },
  methods:{
        closeMenu(){
            $(".page-wrapper").toggleClass("toggled");
        },
        logout(){
            fb.auth().signOut()
            .then(() => {
                this.$router.replace('/');
                toast.fire({
                    type: 'success',
                    title: 'Session ended'
                })
            })
            .catch((err) =>{
                console.log(err);
            });
        }
  },
};
</script>