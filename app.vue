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
import backgroundImage from "/bg-image.jpg";

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
            backgroundImage,
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
        scrollToElement() {
            const el = document.getElementsByTagName("main")[0];
            if (el) {
                el.scrollIntoView({ behavior: "smooth" });
            }
        },
    },
};
</script>

<template>
    <Head>
        <Link title="timeline-styles" rel="stylesheet" href="https://cdn.knightlab.com/libs/timeline3/latest/css/timeline.css" />
    </Head>
    <section v-if="!isOpen" class="h-screen w-screen bg-black">
        <button @click="openPage()" class="fixed left-1/2 top-1/2 h-36 w-36 origin-[0_0] translate-x-[-50%] translate-y-[-50%] animate-play rounded-full bg-white hover:animate-none">
            <Icon class="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] text-8xl text-black" name="mdi:volume-high" />
        </button>
    </section>
    <section v-show="isOpen">
        <img class="fixed -z-10 hidden h-screen w-screen object-cover md:block" src="/bg-image.jpg" />
        <div class="flex h-screen w-screen flex-col items-center justify-around bg-[#D94D4E] p-20 text-white md:bg-transparent md:p-40 md:backdrop-brightness-50">
            <div class="text-center">
                <h1 class="mb-8 text-5xl font-bold md:text-6xl lg:text-7xl">Kendrick Lamar vs. Drake Beef Explained</h1>
                <h2 class="text-xl md:text-2xl lg:text-3xl">By Meghna, Sita, and Varin</h2>
            </div>
            <button @click="scrollToElement()">
                <Icon class="animate-bounce text-7xl" name="vaadin:arrow-circle-down" />
            </button>
        </div>
        <a href="https://www.theringer.com/rap/2024/5/4/24149035" target="_blank" class="absolute bottom-6 right-9 hidden text-[#D94D4E] underline md:inline-block">Image courtesy of Getty Images/Ringer</a>
    </section>
    <main v-show="isOpen">
        <Introduction />
        <div id="timeline-embed" style="width: 100%; height: 600px"></div>
        <Controversy />
    </main>
</template>
