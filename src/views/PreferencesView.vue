<script setup lang="ts">
import ContentPanel from '@/components/ContentPanel.vue';
import UnsavedChangesNoticeBar from '@/components/UnsavedChangesNoticeBar.vue';
import { useUserStore } from '@/stores/useUserStore';
import { computed, ref, watch } from 'vue';

const userStore = useUserStore();

/* Form handling */
const userDetailsInputInitialValues = {
    email: userStore.email,
    firstName: userStore.firstName,
    lastName: userStore.lastName
};
const userDetailsInputValuesRef = ref(structuredClone(userDetailsInputInitialValues));
const computedFullName = computed(() => `${userDetailsInputValuesRef.value.firstName} ${userDetailsInputValuesRef.value.lastName}`);

const userDetailsHasChanges = computed(() => JSON.stringify(userDetailsInputValuesRef.value) !== JSON.stringify(userDetailsInputInitialValues));

</script>

<template>
    <div class="preferences-view-wrapper">
        <div class="panels-container">
            <ContentPanel class="page-panel">
                <header>
                    <h1>User Preferences</h1>
                    <p>You can adjust user-specific options here.</p>
                </header>
                <hr />
                <section class="details-section">
                    <UnsavedChangesNoticeBar v-if="userDetailsHasChanges" />
                    <header>
                        <h2 class="user-details-title">User Details</h2>
                    </header>
                    <form class="details-form">
                        <label for="email">Email</label>
                        <input id="email" type="email" v-model="userDetailsInputValuesRef.email" disabled />
                        <label for="name">Full Name</label>
                        <input id="name" type="text" v-model="computedFullName" disabled />
                        <label for="first-name">First Name</label>
                        <input id="first-name" type="text" v-model="userDetailsInputValuesRef.firstName" />
                        <label for="last-name">Last Name</label>
                        <input id="last-name" type="text" v-model="userDetailsInputValuesRef.lastName" />
                    </form>
                </section>
            </ContentPanel>
        </div>
    </div>
</template> 

<style scoped>
.preferences-view-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 80%;
    height: 2000px;
}
.page-panel {
    position: relative;
    width: 100%;
}
.panels-container {
    position: relative;
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 16px;
}
.details-form {
    position: relative;
    display: grid;
    grid-template-columns: 1fr 4fr;
    grid-auto-rows: max-content;
    row-gap: 5px;
    align-items: center;
}

@media (max-width: 800px) {
    .preferences-view-wrapper {
        width: 100%;
    }
}
@media (max-width: 650px) {
    .details-form {
        grid-auto-rows: max-content;
        grid-template-columns: 1fr;
        row-gap: 8px;
    }
}
</style>