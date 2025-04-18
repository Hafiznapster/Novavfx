declare module 'animejs' {
  function anime(params: AnimeParams): AnimeInstance;

  namespace anime {
    const version: string;
    const speed: number;
    const running: AnimeInstance[];
    const easings: { [name: string]: (t: number) => number };
    
    function remove(targets: AnimeTarget | ReadonlyArray<AnimeTarget>): void;
    function get(targets: AnimeTarget, prop: string, unit?: string): string | number;
    function path(path: string | HTMLElement, percent?: number): (prop: string) => { el: HTMLElement, property: string, totalLength: number };
    function setDashoffset(el: HTMLElement): number;
    function bezier(x1: number, y1: number, x2: number, y2: number): (t: number) => number;
    function stagger(value: number | string | ReadonlyArray<number | string>, options?: StaggerOptions): StaggerFunction;
    function set(targets: AnimeTarget | ReadonlyArray<AnimeTarget>, value: { [prop: string]: any }): void;
    function timeline(params?: AnimeParams): AnimeTimelineInstance;
    function random(min: number, max: number): number;
  }

  type AnimeTarget = string | object | HTMLElement | SVGElement | NodeList | null;

  type AnimeParams = {
    targets?: AnimeTarget | ReadonlyArray<AnimeTarget>;
    
    // Animation Parameters
    duration?: number;
    delay?: number | StaggerFunction;
    endDelay?: number;
    easing?: string | ((el: HTMLElement, index: number, total: number) => string);
    round?: number;
    
    // Animation Properties
    [prop: string]: any;
    
    // Animation Callbacks
    begin?: (anim: AnimeInstance) => void;
    update?: (anim: AnimeInstance) => void;
    complete?: (anim: AnimeInstance) => void;
    loopBegin?: (anim: AnimeInstance) => void;
    loopComplete?: (anim: AnimeInstance) => void;
    changeBegin?: (anim: AnimeInstance) => void;
    changeComplete?: (anim: AnimeInstance) => void;
    
    // Animation Control
    loop?: number | boolean;
    direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
    autoplay?: boolean;
  };

  type StaggerOptions = {
    start?: number | string;
    from?: number | string | 'first' | 'last' | 'center';
    direction?: 'normal' | 'reverse';
    easing?: string | ((el: HTMLElement, index: number, total: number) => string);
    grid?: [number, number];
    axis?: 'x' | 'y';
  };

  type StaggerFunction = (el: HTMLElement, index: number, total: number) => number;

  interface AnimeInstance {
    play(): void;
    pause(): void;
    restart(): void;
    reverse(): void;
    seek(time: number): void;
    
    began: boolean;
    completed: boolean;
    paused: boolean;
    finished: Promise<void>;
    
    // Added properties
    duration: number;
    currentTime: number;
    progress: number;
    animations: any[];
  }

  interface AnimeTimelineInstance extends AnimeInstance {
    add(params: AnimeParams, timeOffset?: string | number): AnimeTimelineInstance;
  }

  export default anime;
}
