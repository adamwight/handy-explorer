<template>
  <div class="about">
    <h1>Human and nature dynamics explorer</h1>
    <p>
      This is an unofficial implementation of the population model from
      <a href="https://www.sciencedirect.com/science/article/pii/S0921800914000615">"Human and nature dynamics (HANDY): Modeling inequality and use of resources in the collapse or sustainability of societies."</a>
      The model is already outdated by further work, but its simplicity and novelty might make this a worthwhile illustration of the concepts in play.
    </p>
    <p><strong>Commoners</strong> are working people who live on a subsistence wage and produce wealth by extracting it from nature.</p>
    <p><strong>Elites</strong> are people who earn some <strong>inequality factor</strong> more than the commoners, and do not directly work at extracting resources.</p>
    <p><strong>Nature</strong> is all of the living things and natural resources of the planet, in aggregate.  It is assumed to regenerate at a slow rate.</p>
    <p><strong>Wealth</strong> is a store of human productive labor, which can be drawn against in times of need.  When wealth is exhausted, famine occurs.</p>

    <hr>

    <p>Source code: <a href="https://github.com/adamwight/handy-explorer">handy-explorer</a></p>
  </div>
</template>

<style scoped>
    div.about {
        width: 65%;
        margin: 10px auto 10px auto;
    }
</style>
