<template>
  <div class="home">
    <Hero />
    <Promos />

    <div class="container h-100">
      <div class="row p-5 h-100 justify-content-center align-items-center">
        <div class="col-md-6">
          <img src="/svg/contact_us.svg" class="w-100" alt="home image">
        </div>
        <div class="col-md-6">
          <h2 class="font-weight-bold">Contactanos</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur quaerat voluptate iusto? Nihil voluptas vitae veritatis magnam reprehenderit, reiciendis ex? Libero quasi natus veniam voluptatum, voluptas exercitationem ratione consectetur et!
          </p>
          <button class="btn custom-btn btn-outline-primary mr-4">Browse Products</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Hero from "@/components/Hero.vue";
import Promos from "@/sections/Promos.vue";

export default {
  name: "home",
  components: {
    Hero, Promos
  }
};
</script>
