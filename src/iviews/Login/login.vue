<template>
    <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
        <FormItem prop="user">
            <Input type="text" v-model="formInline.user" placeholder="Username">
                <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
        </FormItem>
        <FormItem prop="password">
            <Input type="password" v-model="formInline.password" placeholder="Password">
                <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formInline')">Signin</Button>
        </FormItem>
    </Form>
</template>
<script>
    export default {
        data () {
            return {
                formInline: {
                    user: '',
                    password: ''
                },
                ruleInline: {
                    user: [
                        { required: true, message: '请输入账号！', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码！', trigger: 'blur' },
                        { type: 'string', min: 6, message: '密码至少6位！', trigger: 'blur' }
                    ]
                }
            }
        },
        mounted(){
            
        },
        methods: {
            handleSubmit(name) {
                let vm = this
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        vm.$store.dispatch('Login', vm.formInline).then((res) => {
                            vm.$store.dispatch('getUserInfo').then((res) => {
                                vm.$router.push({ path: '/About/article' });  
                            })
                        })
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            }
        }   
    }
</script>
