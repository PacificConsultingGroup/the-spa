<script setup lang="ts">
import ContentPanel from '@/components/ContentPanel.vue';


</script>

<template>
    <div :class="$style.preferencesViewWrapper">
        <div :class="$style.panelsContainer">
            <ContentPanel :class="$style.pagePanel">
                <header>
                    <h1>User Preferences</h1>
                    <p>You can adjust user-specific options here.</p>
                </header>
                <hr />
                <section :class="$style.detailsSection">
                    <header>
                        <h2 :class="$style.userDetailsTitle">User Details</h2>
                    </header>
                    <form :class="$style.detailsForm">
                        <label for="email">Email</label>
                        <input id="email" type="email" disabled />
                        <label for="name">Full Name</label>
                        <input id="name" type="text" disabled />
                        <label for="first-name">First Name</label>
                        <input id="first-name" type="text" />
                        <label for="last-name">Last Name</label>
                        <input id="last-name" type="text" />
                    </form>
                </section>
            </ContentPanel>
        </div>
    </div>
</template> 

<style module>
.preferencesViewWrapper {
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 80%;
    height: 2000px;
}
.pagePanel {
    position: relative;
    width: 100%;
}
.panelsContainer {
    position: relative;
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 16px;
}
.detailsForm {
    position: relative;
    display: grid;
    grid-template-columns: 1fr 4fr;
    grid-auto-rows: max-content;
    row-gap: 5px;
    align-items: center;
}

@media (max-width: 800px) {
    .preferencesViewWrapper {
        width: 100%;
    }
}
@media (max-width: 650px) {
    .detailsForm {
        grid-auto-rows: max-content;
        grid-template-columns: 1fr;
        row-gap: 8px;
    }
}
</style>