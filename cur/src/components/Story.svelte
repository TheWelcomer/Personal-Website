<script lang="ts">
  import colors from "$data/thumbnail-colors.json";
  let {
    collapse,
    url,
    url_alt,
    slug,
    tease,
    month
  } = $props();

  const DEFAULT_COLOR = {
    light: "hsl(0, 0%, 80%)",
    dark: "hsl(0, 0%, 44%)",
    darker: "hsl(0, 0%, 34%)"
  };

  const lookupColor = (version) => {
    const match = colors.find((d) => d.slug === slug);
    return match ? match[version] : DEFAULT_COLOR;
  };

  const style = `
	--light: ${lookupColor("light")};
	--dark: ${lookupColor("dark")};
	--darker: ${lookupColor("darker")};
	--default-light: ${DEFAULT_COLOR["light"]};
	--default-dark: ${DEFAULT_COLOR["dark"]};
	--default-darker: ${DEFAULT_COLOR["darker"]};
  `;

  const href = url_alt || `https://pudding.cool/${url}`;
</script>

<div class="story" class:is-collapsed={collapse} {style}>
  <a {href} rel="external" class="inner column-wide">
    <img
      src="/common/assets/thumbnails/32/{slug}.jpg"
      alt="thumbnail for story"
      srcset="/common/assets/thumbnails/1280/{slug}.jpg 1280w,
			/common/assets/thumbnails/960/{slug}.jpg 960w,
			/common/assets/thumbnails/640/{slug}.jpg 640w"
      sizes="(max-width: 320px) 640px, (max-width: 480px) 960px, 1280px"
      loading="lazy"
    />
    <div class="info">
      <h3 class="tease">
        <span>{@html tease}</span>
      </h3>
      <p>{month}</p>
    </div>
  </a>
</div>

<style>
  .story {
    background: var(--light);
    margin-bottom: 0.25rem;
  }

  .tease span {
    color: var(--color-body);
    background-size: 100% 0.05em;
    background-position: 0 90%;
    background-repeat: no-repeat;
    background-image: linear-gradient(var(--dark), var(--dark));
    transition: all var(--transition-fast) var(--transition-ease);
    padding: 0 0.05em;
  }

  a {
    background: none;
    display: flex;
    padding: 4rem 0;
    align-items: flex-start;
  }

  a:hover .tease span,
  a:focus .tease span {
    background-size: 100% 0.1em;
    background-image: linear-gradient(var(--darker), var(--darker));
  }

  a:hover img {
    transform: scale(1.02);
  }

  img {
    max-width: 640px;
    min-width: 40%;
    width: 40%;
    border: 1px solid var(--darker);
    transition: transform var(--transition-fast) var(--transition-ease);
  }

  .info {
    display: flex;
    flex-direction: column;
    padding: 0 1.5em;
  }

  .tease {
    margin: 0;
    color: currentColor;
    font-weight: var(--font-weight-normal);
  }

  .info p {
    color: var(--darker);
  }

  .story.is-collapsed {
    background: var(--default-light);
  }

  .story.is-collapsed .tease span {
    background-image: linear-gradient(var(--default-dark), var(--default-dark));
  }

  .story.is-collapsed a:hover span,
  .story.is-collapsed a:focus span {
    background-image: linear-gradient(var(--default-darker), var(--default-darker));
  }

  .story.story img {
    border: 1px solid var(--default-darker);
  }

  .story.is-collapsed .info p {
    color: var(--default-dark);
  }

  .story.is-collapsed img {
    width: 20%;
    filter: grayscale(1);
  }

  @media (max-width: 540px) {
    .inner {
      flex-direction: column;
    }

    img {
      width: 100%;
      margin: 0 auto;
      margin-bottom: 1em;
    }

    .story.is-collapsed img {
      width: 100%;
    }

    .info {
      padding: 0;
    }
  }
</style>
