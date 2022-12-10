<script setup lang="ts">
import AdviceService from "@/services/AdviceService/AdviceService";
import type { IAdviceServiceData } from "../services/AdviceService/types";
import { onMounted, ref } from "vue";

const advice = ref<IAdviceServiceData>();
const isLoading = ref<boolean>(false);
const error = ref<string>("");

const getAdvice = async () => {
  isLoading.value = true;
  AdviceService.getAdvice().then((result) => {
    if (result instanceof Error) {
      isLoading.value = false;
      error.value = result.message;
    } else {
      isLoading.value = false;
      advice.value = {
        ...result,
      };
    }
  });
};

onMounted(async () => {
  await getAdvice();
});
</script>

<template>
  <div class="container">
    <div class="box-content">
      <div class="child-box-content">
        <p class="advice-title">ADVICE #{{ advice?.slip.id }}</p>
      </div>

      <div class="child-box-content">
        <div class="spinner-box" v-if="isLoading">
          <div class="spinner"></div>
        </div>
        <p class="advice-content" v-if="!isLoading && error.length <= 0">
          "{{ advice?.slip.advice }}"
        </p>
        <p class="advice-content" v-if="error.length > 0">{{ error }}</p>
      </div>

      <div class="divider child-box-content"></div>

      <button v-on:click="getAdvice()" class="btn-random"></button>
    </div>
  </div>

  <footer class="attribution">
    <p>
      Challenge by
      <a href="https://www.frontendmentor.io?ref=challenge" target="_blank"
        >Frontend Mentor</a
      >. Coded by
      <a target="_blank" href="https://github.com/eduardosantanna"
        >Eduardo Santana</a
      >.
    </p>
  </footer>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
  height: 100vh;
  width: 100vw;
  background-color: hsl(218, 23%, 16%);
}

.box-content {
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 50px 18px 50px 18px;
  height: 330px;
  width: 100%;
  max-width: 550px;
  background-color: hsl(217, 19%, 24%);
  border-radius: 10px;
}

.advice-title {
  width: 100%;
  color: hsl(150, 100%, 66%);
  font-size: 0.5em;
  letter-spacing: 4px;
  text-align: center;
  font-weight: 800;
}

.advice-content {
  color: hsl(193, 38%, 86%);
  font-weight: 800;
  text-align: center;
  font-size: 0.8em;
}

.divider {
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent url("./icons/pattern-divider-mobile.svg") no-repeat
    50%;
}

.child-box-content {
  flex: 1;
}

.btn-random {
  position: absolute;
  border: none;
  outline: none;
  background: hsl(150, 100%, 66%) url("../components/icons/icon-dice.svg")
    no-repeat 50%;
  border-radius: 50%;
  height: 68px;
  width: 68px;
  bottom: 0;
  left: 50%;
  transform: translateY(50%) translateX(-50%);
  cursor: pointer;
}

.btn-random:hover {
  box-shadow: 0px 0px 30px 0px hsl(150, 100%, 66%);
}

.spinner-box {
  display: flex;
  justify-content: center;
  align-items: center;
}

.spinner {
  height: 70px;
  width: 70px;
  border-top: 2px solid hsl(150, 100%, 66%);
  animation: rotation 1s infinite linear;
  border-radius: 50%;
}

.attribution {
  position: absolute;
  bottom: 0;
  width: 100%;
  text-align: center;
}

.attribution p {
  text-align: center;
  font-size: 0.5em;
  color: hsl(193, 38%, 86%);
}

.attribution p a {
  text-decoration: none;
  font-size: 1.2em;
  color: hsl(150, 100%, 66%);
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(359deg);
  }
}

@media (min-width: 375px) {
  .divider {
    background-image: url("./icons/pattern-divider-desktop.svg");
  }
}
</style>
