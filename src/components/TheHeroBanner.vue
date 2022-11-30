<script setup lang="ts">


</script>

<template>
    <div :class="$style.theHeroBannerWrapper">
        <h1 :class="$style.heroText">Make It Happen</h1>
    </div>
</template>

<style module>
.theHeroBannerWrapper {
    position: relative;
    padding-top: 160px;
    padding-bottom: 100px;
    padding-left: 100px;
    background-color: transparent;
}
.heroText {
    font-size: 36px;
    font-weight: bold;
    filter: drop-shadow(7px 6px 2px hsla(0, 0%, 0%, 0.12));
    color: var(--color-mono-base);
}

@media (prefers-color-scheme: light) {
    .heroText {
        color: var(--color-mono-darkest);
    }
}
</style>