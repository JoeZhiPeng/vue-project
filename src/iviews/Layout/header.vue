<template>
    <Header>
        <Menu mode="horizontal" theme="dark" active-name="1">
            <div class="layout-logo"></div>
            <div class="layout-nav">
                <MenuItem :name="item.menuId" v-for="item in menus" :key="item.menuId" @click.native="firstMenuClick(item)">
                    <Icon type="ios-navigate"></Icon>
                    {{item.menuName}}
                </MenuItem>
            </div>
        </Menu>
    </Header>
</template>
<script>
    import { mapGetters } from 'vuex';
    export default {
        data() {
            return {
              
            }
        },
        computed: {
            ...mapGetters([
                'menus'
            ])
        },
        mounted() {
            this.getStartMenu()   
        },
        methods: {
            firstMenuClick(item) {
                this.$emit('getMeunObj', item)
            },
            getStartMenu() {
                let startMenu = this.$store.state.permission.menus[0];
                this.$emit('getMeunObj', startMenu)
            }
        }
    }
</script>
