<template>
    <form class="mt-5">
        <div class="form-floating mt-3">
            <input v-model="user.username" type="text" class="form-control" id="username" placeholder="Usuario">
            <label for="username">Usuario</label>
        </div>
        <div class="form-floating mt-3">
            <input v-model="user.password" type="password" class="form-control" id="password" placeholder="Contraseña">
            <label for="password">Contraseña</label>
        </div>
        <div class="d-flex justify-content-center mt-5">
            <button v-on:click.prevent="login" class="btn btn-primary">Iniciar sesión</button>
        </div>
    </form>   
</template>

<script>
export default {
    name: 'LoginForm',
    data() {
        return {
            user: {
                username: '',
                password: ''
            }
        }
    },
    methods: {
        login() {
            if(this.user.username) {
                if(this.user.password) {
                    this.$emit('user-login', this.user)
                } else {
                    alert('La contraseña es obligatoria')
                    return
                }
            } else {
                alert('El usuario es obligatorio.')
                return
            }
        }
    }
}
</script>

<style>

</style>


