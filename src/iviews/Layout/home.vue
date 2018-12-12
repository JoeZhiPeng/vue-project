<template>
    <div class="layout">
        <Layout>
            <vue-header @getMeunObj="getSendMeun"></vue-header>
            <Layout>
                <vue-menu :menuHeight='conHeight' :menus='menus'></vue-menu>
                <Layout>
                    <vue-content></vue-content>
                </Layout>
            </Layout>
        </Layout>
    </div>
</template>
<script>
    import vueHeader from './header.vue'
    import vueMenu from './menu.vue'
    import vueContent from './main.vue'
    export default {
        components: {
            vueHeader,  vueMenu, vueContent
        },
        data() {
            return {
                conHeight: '400px',
                menus: null
            }
        },
        created() {
        　　this.getWindowHeight()
        },
        methods: {
        　　getWindowHeight(){
        　　　　this.conHeight = window.innerHeight - 64 + 'px';
        　　},
            getSendMeun(data) {
                this.menus = data.children
            }
        }
    }
</script>
<style>
    .layout{
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
</style>

