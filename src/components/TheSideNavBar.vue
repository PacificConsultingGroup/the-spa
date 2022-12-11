<script setup lang="ts">
import ContentPanel from './ContentPanel.vue';
import TheSideNavBarMenuCompoundItem from './TheSideNavBarMenuCompoundItem.vue';
import TheSideNavBarMenuSimpleItem from './TheSideNavBarMenuSimpleItem.vue';

interface MenuSimpleItem {
    label: string;
    icon: string;
    path: string;
}

interface MenuSubItem {
    label: string;
    icon: string;
    path: string;
}
interface MenuCompoundItem {
    label: string;
    icon: string;
    menuItems: MenuSubItem[];
}

const simpleItems: MenuSimpleItem[] = [
    {
        label: 'Home',
        icon: 'material-symbols:home-outline',
        path: '/home'
    },
    {
        label: 'Preferences',
        icon: 'ri:user-settings-line',
        path: '/preferences'
    }
];

const compoundItems: MenuCompoundItem[] = [ // TODO: Fetch from backend to construct this object.
    {
        label: 'Programmes',
        icon: 'octicon:project-16',
        menuItems: [
            {
                label: 'Pulse Check',
                icon: 'ion:pulse-sharp',
                path: ''
            },
            {
                label: 'Confidence Assessment',
                icon: 'bx:spreadsheet',
                path: ''
            },
            {
                label: 'Financial Targets',
                icon: 'mdi:target-arrow',
                path: ''
            },
            {
                label: 'Open Initiative Approvals',
                icon: 'material-symbols:approval-delegation-outline',
                path: ''
            }
        ]
    }
];

</script>

<template>
    <nav class="the-side-nav-bar-wrapper">
        <ContentPanel class="panel">
            <section class="items-container main-items-container">
                <TheSideNavBarMenuSimpleItem
                    v-for="simpleItem in simpleItems"
                    :key="simpleItem.label"
                    class="item simple-item"
                    :label="simpleItem.label"
                    :icon="simpleItem.icon"
                    :path="simpleItem.path">
                </TheSideNavBarMenuSimpleItem>
            </section>
            <hr class="section-divider" />
            <section class="items-container main-groups-container">
                <TheSideNavBarMenuCompoundItem
                    v-for="compoundItem in compoundItems"
                    :key="compoundItem.label"
                    class="item compound-item"
                    :label="compoundItem.label"
                    :icon="compoundItem.icon"
                    :menuItems="compoundItem.menuItems" />
            </section>
        </ContentPanel>
    </nav>
</template>

<style scoped>
.the-side-nav-bar-wrapper {
    position: relative;
    width: 70px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.panel {
    position: relative;
    padding: unset;
    width: 100%;
    height: 100%;
    padding: 10px 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.section-divider {
    margin: 10px 0px;
    width: 70%;
}
.items-container {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.item {
    position: relative;
    height: 50px;
}
</style>