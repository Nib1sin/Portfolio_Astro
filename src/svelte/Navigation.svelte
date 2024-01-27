<script>
  export let selectedLink = '';
  
  function handleLinkClick(link) {
    selectedLink = link;
    // Emitir un evento personalizado para informar al padre (header.astro) sobre el cambio de enlace seleccionado
    dispatch('linkSelected', { selectedLink });
  }
</script>

<style>
  a {
    /* Estilos normales de los enlaces */
    color: inherit;
    text-decoration: none;
    padding: 0.5rem;
    margin: 0.2rem;
  }

  .selected {
    /* Estilos para el enlace seleccionado */
    color: #ffffff;
    background-color: #333333;
    border-radius: 0.25rem;
  }
</style>

<a
  class="{selectedLink === '/#experiencia' ? 'selected' : ''}"
  href="/#experiencia"
  on:click={() => handleLinkClick('/#experiencia')}
>Experiencia</a>
<a 
  class="{selectedLink === '/#proyectos' ? 'selected' : ''}"
  href="/#proyectos"
  on:click={() => handleLinkClick('/#proyectos')}
>Proyectos</a>
<a 
  class="{selectedLink === '/#' ? 'selected' : ''}"
  href="/#"
  on:click={() => handleLinkClick('/#')}
>Sobre mí</a>
<a 
  class="hover:bg-white/10 rounded-full px-3 transition {selectedLink === '/#contacto' ? 'selected' : ''}"
  href="/#contacto"
  on:click={() => handleLinkClick('/#contacto')}
>Contacto</a>


