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
        <h2 class="font-weight-bold mt-4">Lista de promociones</h2>
        <table class="table mt-3">
            <thead>
                <tr>
                    <th>Título</th>
                    <th>Descripción</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="promo in promos" :key="promo.id">
                    <td>{{ promo.title }}</td>
                    <td>{{ promo.description }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import {fb, db} from '../firebase'
    import { log } from 'util';
    export default {
        data: () => ({
            promos: [],
            promo: {
                title: null,
                description: null,
            }
        }),
        methods: {
            loadData(){
                db.collection("promos").get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        this.promos.push(doc.data());
                    });
                });
            },
            saveData() {
                this.$Progress.start();
                db.collection('promos').add(this.promo)
                .then((docRef) => {
                    this.$Progress.finish();
                    toast.fire({
                        type: 'success',
                        title: 'Promoción creada correctamente'
                    })
                    console.log("Document written with ID: ", docRef.id);
                    this.reset();
                })
                .catch((error) => {
                    this.$Progress.fail();
                    toast.fire({
                        type: 'error',
                        title: 'Error al crear promoción'
                    })
                    console.log("Error adding document ", error);
                });
            },
            reset(){
                Object.assign(this.$data, this.$options.data.apply(this));
            }
        },
        created(){
            this.loadData();
        }
    }
</script>

<style lang="scss" scoped>

</style>