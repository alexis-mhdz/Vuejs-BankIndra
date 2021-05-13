<template>
    <nav class="navbar navbar-expand-sm navbar-dark bg-primary">
        <div class="container-fluid">
        <a class="navbar-brand" href="#">BankIndra</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto mb-2 mb-sm-0">
                <li class="nav-item">
                    <router-link class="nav-link" active-class="active" to="/" exact>Inicio</router-link>
                </li>
                <li v-if="loggedIn" class="nav-item ms-sm-2">
                    <router-link v-if="this.$session.get('rol').name === 'ADMINISTRADOR'" class="nav-link" active-class="active" to="/admin">Administrador</router-link>
                    <router-link v-else-if="this.$session.get('rol').name === 'INVITADO'" class="nav-link" active-class="active" to="/guest">Invitado</router-link>
                </li>
                <li v-if="!loggedIn" class="nav-item ms-sm-2">
                    <router-link class="nav-link" active-class="active" to="/login">Iniciar sesión</router-link>
                </li>
                <li v-else class="nav-item ms-sm-2">
                    <a href="#logout" v-on:click.prevent="logout" class="nav-link">Cerrar sesión</a>
                </li>
            </ul>
        </div>
        </div>
  </nav>
</template>

<script>
export default {
    props: ['loggedIn'],
    methods: {
        logout() {
            this.$session.clear()
            this.$session.destroy()
            this.$emit('change-logged-in', false)
            this.$router.push('/')
        }
    },
}
</script>