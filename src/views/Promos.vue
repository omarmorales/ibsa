<template>
    <div>
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="#">Inicio</a></li>
                <li class="breadcrumb-item active" aria-current="page">Promociones</li>
            </ol>
        </nav>
        <h1 class="font-weight-bold text-center">Promociones</h1>
        <div class="form-group">
            <label for="title">Título de la promoción</label>
            <input v-model="promo.title" type="text" class="form-control" id="title" aria-describedby="promo">
        </div>
        <div class="form-group">
            <label for="description">Descripción</label>
            <textarea v-model="promo.description" class="form-control" id="description"></textarea>
        </div>
        <button @click="saveData" class="btn btn-primary">Agregar promoción</button>
    </div>
</template>

<script>
    import {fb, db} from '../firebase'
import { log } from 'util';
    export default {
        data: () => ({
            promo: {
                title: null,
                description: null,
            }
        }),
        methods: {
            saveData() {
                db.collection('promos').add(this.promo)
                .then((docRef) => {
                    console.log("Document written with ID: ", docRef.id);
                    this.reset();
                })
                .catch((error) => {
                    console.log("Error adding document ", error);
                });
            },
            reset(){
                Object.assign(this.$data, this.$options.data.apply(this));
            }
        },
        created(){

        }
    }
</script>

<style lang="scss" scoped>

</style>