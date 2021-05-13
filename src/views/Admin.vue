<template>
    <div>
        <header class="bg-secondary text-white py-2">
            <div class="container">
                <h1>Panel de administrador</h1>
            </div>
        </header>
        <section class="mt-5">
            <div class="container">
                <div class="row">
                    <div class="col-sm-6 col-lg-4">
                        <div class="border">
                            <div class="bg-secondary text-white p-2">
                                <h5 class="mb-0">Información de cuenta</h5>
                            </div>
                            <div class="p-2">
                                <p class="mb-1">Usuario: <strong>{{ this.$session.get('fullName') }}</strong></p>
                                <p>Email: <strong>{{ this.$session.get('email') }}</strong></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    beforeCreate() {
        if (this.$session.exists()) {
            const role = this.$session.get('rol')
            if(role.name !== "ADMINISTRADOR") {
                this.$router.push('/')                
            }

        } else {
            this.$router.push('/')                
        }
    }
}
</script>
