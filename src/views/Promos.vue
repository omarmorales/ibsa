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
        <div class="table-responsive">
            <table class="table mt-3">
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Descripción</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="promo in promos" :key="promo.id">
                        <td>{{ promo.data().title }}</td>
                        <td>{{ promo.data().description }}</td>
                        <td>
                            <button class="btn btn-primary" @click="editPromo(promo)">Editar</button>
                        </td>
                        <td>
                            <button class="btn btn-danger" @click="deletePromo(promo.id)">Eliminar</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>


        <!-- Modal -->
        <div class="modal fade" id="promoModal" tabindex="-1" role="dialog" aria-labelledby="promoModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="promoModalLabel">Editar promoción</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="title">Título de la promoción</label>
                            <input v-model="promo.title" type="text" class="form-control" id="title" aria-describedby="promo">
                        </div>
                        <div class="form-group">
                            <label for="description">Descripción</label>
                            <textarea v-model="promo.description" class="form-control" id="description"></textarea>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                        <button type="button" class="btn btn-primary" @click="updatePromo(promo.id)">Guardar cambios</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {fb, db} from '../firebase'
    import { log } from 'util';
    import swal from 'sweetalert2';
    export default {
        components: {
            swal
        },
        data: () => ({
            promos: [],
            promo: {
                title: null,
                description: null,
            },
            activeItem: null
        }),
        methods: {
            updatePromo(promo){
                db.collection("promos").doc(this.activeItem).update(this.promo)
                .then(function(){
                    $('#promoModal').modal('hide');
                    console.log("success");
                    
                }).catch(function(error){
                    console.log("error: ", error);
                    
                })
            },
            editPromo(promo){
                $('#promoModal').modal('show');

                this.promo = promo.data();

                this.activeItem = promo.id;
            },
            deletePromo(promo){
                //alert(promo);

                swal.fire({
                    title: '¿Estás seguro?',
                    text: 'No podrás recuperar este archivo',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Sí, bórralo',
                    cancelButtonText: 'No'
                }).then((result) => {
                    if (result.value) {
                        db.collection("promos").doc(promo).delete().then(function() {
                            swal.fire(
                                '¡Eliminado!',
                                'Su archivo ha sido eliminado.',
                                'success'
                            )
                        }).catch(function(error){
                            swal.fire(
                                'Error', 
                                'Algo salió mal', 
                                'warning'
                            )
                        })
                    } else if (result.dismiss === swal.DismissReason.cancel) {
                        swal.fire(
                            'Cancelado',
                            'Tu archivo está seguro :)',
                            'error'
                        )
                    }
                })
            },
            loadData(){
                db.collection("promos").get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        this.promos.push(doc);
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
                    this.loadData();
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