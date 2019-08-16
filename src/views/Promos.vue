<template>
    <div>
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="#">Inicio</a></li>
                <li class="breadcrumb-item active" aria-current="page">Promociones</li>
            </ol>
        </nav>
        <h1 class="font-weight-bold text-center">Promociones</h1>
        <button @click="addPromo" class="btn btn-primary float-right">Agregar promoción</button>
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
                        <h5 class="modal-title" id="promoModalLabel">Promoción</h5>
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
                        <div class="form-group">
                            <label for="price">Precio</label>
                            <input v-model="promo.price" type="text" class="form-control" id="price">
                        </div>
                        <div class="form-group">
                            <label for="tag">Etiqueta</label>
                            <input v-model="promo.tag" type="text" class="form-control" id="tag">
                        </div>
                        <div class="form-group">
                            <label for="product_image">Imágen</label>
                            <input @change="updateImage()" type="file" class="form-control">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                        <button type="button" class="btn btn-primary" @click="savePromo(promo.id)">Guardar cambios</button>
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
            editmode: false,
            promos: [],
            promo: {
                title: null,
                description: null,
                price: null,
                tag: null,
                image: null
            },
            activeItem: null
        }),
        firestore(){
            return {
                promos: db.collection('promos'),
            }
        },
        methods: {
            uploadImage(){

            },
            updatePromo(promo){

            },
            editPromo(promo){
                this.editmode = true;

                $('#promoModal').modal('show');

                this.promo = promo.data();

                this.activeItem = promo.id;
            },
            deletePromo(promo){

            },
            loadData(){

            },
            addPromo(){
                this.editmode = false;
                $('#promoModal').modal('show');
            },
            savePromo() {
                this.$firestore.promos.add(this.promo)
/*                 this.$Progress.start();
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
                }); */
            },
            reset(){

            }
        },
        created(){
            this.loadData();
        }
    }
</script>

<style lang="scss" scoped>

</style>