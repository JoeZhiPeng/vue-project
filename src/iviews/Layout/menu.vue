<template>
    <Sider hide-trigger :style="{background: '#fff',minHeight: menuHeight, zIndex: 1, overflow: 'auto', borderRight: '1px solid #dcdee2'}">
        <Menu :open-names="['1']" accordion width="auto">
            <Submenu v-for="item in menus" :key="item.menuId" :name=item.menuId>
                <template slot="title">
                    <Icon :type="item.menuIcon"/>
                    {{item.menuName}}
                </template>
                <MenuItem v-if="item.children && item.children.length > 0" v-for="(i, index) in item.children" :key="i.menuId" :name=i.menuPid-index>
                    <router-link :to="i.frontRouting" tag="span">{{i.menuName}}</router-link>
                </MenuItem>
            </Submenu>
        </Menu>
    </Sider>
</template>
<script>
    import menusArr from '@static/dataJson/menu.json'
    export default {
        props: {
            menuHeight: String
        },
        data() {
            return {
                menus: menusArr.menus,
                perms: menusArr.perms
            }
        },
        mounted() {
            
        },
        methods: {

        }
    }
</script>
<style>
   
</style>

