// Test different import methods
import * as animeNamespace from 'animejs';
const animeDefault = animeNamespace.default;

console.log('animeNamespace:', animeNamespace);
console.log('animeDefault:', animeDefault);

// Export for testing
export { animeNamespace, animeDefault };
