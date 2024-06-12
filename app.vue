<script setup>
useHead({
  script: [{ src: "https://cdn.knightlab.com/libs/timeline3/latest/js/timeline.js", body: true }],
});
</script>

<script>
import euphoria from "../assets/audio/euphoria.mp3";
import familymatters from "../assets/audio/familymatters.mp3";
import meetthegrahams from "../assets/audio/meetthegrahams.mp3";
import notlikeus from "../assets/audio/notlikeus.mp3";
import theheartpart6 from "../assets/audio/theheartpart6.mp3";
import bbldrizzy from "../assets/audio/bbldrizzy.mp3";

export default {
  beforeMount() {
    window.addEventListener("scroll", this.handleScroll);
  },
  mounted() {
    let audios = [euphoria, familymatters, meetthegrahams, notlikeus, theheartpart6, bbldrizzy];
    const rand = Math.floor(Math.random() * 6);
    this.audio = new Audio(audios[rand]);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
    this.audio.pause();
  },
  data() {
    return {
      isOpen: false,
      audio: null,
    };
  },
  methods: {
    handleScroll() {
      let main = document.getElementsByTagName("main");
      if (main[0].getBoundingClientRect().top > 0) {
        this.audio.play();
      } else {
        this.audio.pause();
      }
    },
    openPage() {
      this.isOpen = true;
      this.audio.play();
      timeline = new TL.Timeline("timeline-embed", "https://docs.google.com/spreadsheets/d/1yPDe-wopvP_4WV93aIuROohvYDt_myLelFf-G0HPE0U/edit", { initial_zoom: 6 });
    },
  },
};
</script>

<template>
  <Head>
    <Link title="timeline-styles" rel="stylesheet" href="https://cdn.knightlab.com/libs/timeline3/latest/css/timeline.css" />
  </Head>
  <section v-if="!isOpen" class="h-screen w-screen bg-black">
    <button @click="openPage()" class="animate-play fixed left-1/2 top-1/2 h-36 w-36 origin-[0_0] translate-x-[-50%] translate-y-[-50%] rounded-full bg-white hover:animate-none">
      <Icon class="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] text-8xl text-black" name="mdi:play" />
    </button>
  </section>
  <section v-show="isOpen" class="h-screen w-screen bg-red-300">
    <div class="relative p-40 text-white">
      <h1>Title</h1>
    </div>
  </section>
  <main v-show="isOpen">
    <section class="h-screen w-auto bg-green-600"></section>
    <div id="timeline-embed" style="width: 100%; height: 600px"></div>
    <section v-if="isOpen" class="h-auto w-auto bg-blue-600"></section>
  </main>
</template>
