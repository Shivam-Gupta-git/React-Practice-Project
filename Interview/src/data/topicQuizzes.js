/**
 * Comprehensive bank of most-asked interview quiz questions for all 21 React topics.
 */
export const topicQuizzes = {
  props: [
    {
      question: 'Why are props in React read-only and immutable inside child components?',
      options: [
        'To force components to compile faster in Webpack',
        'To enforce unidirectional top-down data flow and predictable UI updates',
        'Because JavaScript frozen objects perform faster in Chrome',
        'To restrict access to DOM APIs',
      ],
      correct: 1,
      explanation: 'Props are read-only to maintain React’s strict unidirectional data flow. Data flows down from parent to child, ensuring component predictability.',
    },
    {
      question: 'How does React.memo determine whether to skip re-rendering a component when props change?',
      options: [
        'It performs a deep recursive equality check on all prop values',
        'It performs a shallow comparison (===) of current vs next props',
        'It checks if prop names match regex patterns',
        'It re-renders only on window scroll events',
      ],
      correct: 1,
      explanation: 'React.memo performs shallow reference equality checks on props. If object references change, it re-renders unless custom comparison is passed.',
    },
  ],
  state: [
    {
      question: 'Why should state never be mutated directly (e.g. state.count = 1) in React?',
      options: [
        'It causes browser security exceptions',
        'React skips re-rendering because reference equality check sees no change',
        'Direct mutations convert state into global window variables',
        'It breaks CSS styling rules',
      ],
      correct: 1,
      explanation: 'React relies on state setter calls to schedule re-renders. Direct mutation retains the old object reference, skipping UI reconciliation.',
    },
    {
      question: 'When updating state based on previous state value, what is the best practice?',
      options: [
        'Use setCount(count + 1) inside async callbacks',
        'Pass a functional updater: setCount(prevCount => prevCount + 1)',
        'Store previous state in localStorage before updating',
        'Call forceUpdate() immediately after',
      ],
      correct: 1,
      explanation: 'Functional state updates guarantee access to the latest state value even during async batching or concurrent rendering.',
    },
  ],
  'conditional-rendering': [
    {
      question: 'What unexpected bug occurs when rendering {count && <List />} when count is 0?',
      options: [
        'The app throws an uncaught NullPointerException',
        'The number 0 is rendered onto the DOM screen',
        'React re-renders infinitely',
        'The component unmounts silently',
      ],
      correct: 1,
      explanation: 'In JavaScript, 0 && <JSX /> evaluates to 0. Since 0 is a valid primitive React node, React renders the character "0" to the screen.',
    },
    {
      question: 'Which pattern is cleanest for handling 4+ multi-branch conditional states in JSX?',
      options: [
        'Deeply nested ternary operators (a ? b : c ? d : e ? f : g)',
        'Object lookup dictionary or switch statement inside helper function',
        'Multiple logical && operators chained in a single line',
        'Modifying window.document inside render',
      ],
      correct: 1,
      explanation: 'Using an object lookup dictionary or helper switch function eliminates messy nested ternaries and keeps JSX readable.',
    },
  ],
  'controlled-components': [
    {
      question: 'What defines a Controlled Component in React forms?',
      options: [
        'Form inputs managed directly by standard DOM query selectors',
        'Form input values driven by React state and updated via onChange handlers',
        'Inputs wrapped in HTML5 form tags with action attributes',
        'Components that prevent user typing',
      ],
      correct: 1,
      explanation: 'In controlled components, input elements receive their value from React state and dispatch state updates on keystroke change events.',
    },
    {
      question: 'What happens if you render <input value={name} /> without an onChange handler?',
      options: [
        'The input becomes a read-only field that ignores user typing',
        'React throws a fatal runtime compilation error',
        'The input defaults to an uncontrolled component',
        'The input value clears on blur',
      ],
      correct: 0,
      explanation: 'Specifying a value prop without onChange locks the input value to the state string, rendering it read-only in the DOM.',
    },
  ],
  'uncontrolled-components': [
    {
      question: 'How do uncontrolled components store and retrieve form input data?',
      options: [
        'Via Redux global state tree',
        'Inside internal DOM nodes accessed via React useRef hooks',
        'In browser cookies',
        'Through URL query params',
      ],
      correct: 1,
      explanation: 'Uncontrolled components store data inside the native DOM nodes themselves and read values using ref.current.value upon submit.',
    },
    {
      question: 'Which prop specifies initial values for uncontrolled input elements?',
      options: ['value', 'defaultValue', 'initialValue', 'stateValue'],
      correct: 1,
      explanation: 'defaultValue sets the initial value in the DOM for uncontrolled inputs without locking user typing updates.',
    },
  ],
  'use-state': [
    {
      question: 'How does React 18 automatic batching improve performance for useState?',
      options: [
        'It groups multiple state updates inside timeouts and promises into a single re-render',
        'It converts useState into Redux stores automatically',
        'It disables component re-rendering entirely',
        'It runs state setters on Web Workers',
      ],
      correct: 0,
      explanation: 'React 18 automatically batches state updates across event handlers, promises, and timeouts into a single unified re-render.',
    },
  ],
  'use-effect': [
    {
      question: 'When does the cleanup function returned inside useEffect run?',
      options: [
        'Only when the browser window reloads',
        'Before the component unmounts and before re-running effect on dependency change',
        'Immediately after initial render completes',
        'Every 5 seconds in background',
      ],
      correct: 1,
      explanation: 'Effect cleanup functions execute prior to component unmounting and right before subsequent effect executions when dependencies change.',
    },
  ],
  'use-memo': [
    {
      question: 'What is the primary purpose of the useMemo hook in React?',
      options: [
        'To memoize component function handlers across re-renders',
        'To cache the calculated result of expensive computations across re-renders',
        'To save state to browser localStorage automatically',
        'To delay component mounting',
      ],
      correct: 1,
      explanation: 'useMemo caches calculated values so expensive computations do not re-run unless specified dependencies change.',
    },
  ],
  'use-callback': [
    {
      question: 'Why is useCallback typically paired with React.memo on child components?',
      options: [
        'To create unique function references on every render',
        'To preserve stable function reference identity so React.memo skips child re-renders',
        'To convert async functions into sync promises',
        'To validate prop types at runtime',
      ],
      correct: 1,
      explanation: 'useCallback keeps callback reference identities stable across parent re-renders so child components wrapped in React.memo skip re-rendering.',
    },
  ],
  'use-transition': [
    {
      question: 'What problem does the useTransition hook solve in React 18?',
      options: [
        'It converts class components into functional components automatically',
        'It marks state updates as non-blocking transitions so user typing remains responsive during heavy re-renders',
        'It forces synchronous blocking loops during render',
        'It bypasses React reconciliation engine',
      ],
      correct: 1,
      explanation: 'useTransition marks state updates as non-urgent transitions, allowing urgent user interactions (typing/clicking) to interrupt background rendering.',
    },
    {
      question: 'What is the purpose of the isPending boolean returned by useTransition?',
      options: [
        'It indicates whether a non-urgent transition state render is currently executing in background',
        'It tracks browser window scroll direction',
        'It flags syntax errors in JSX',
        'It disables CSS styles',
      ],
      correct: 0,
      explanation: 'isPending is true while React works on completing the transition render in the background, allowing developers to show visual spinners.',
    },
  ],
  'list-virtualization': [
    {
      question: 'What is List Virtualization (Windowing) in React performance engineering?',
      options: [
        'Rendering 100,000 DOM nodes simultaneously inside hidden div tags',
        'Rendering only the small subset of items currently visible in the scroll viewport (~10 DOM nodes)',
        'Converting React components into desktop electron apps',
        'Caching database SQL queries in memory',
      ],
      correct: 1,
      explanation: 'List Virtualization keeps DOM node count constant by calculating viewport scroll offsets and rendering only items visible on screen.',
    },
    {
      question: 'Why does Virtualization keep memory usage constant regardless of dataset size (e.g. 100,000 items)?',
      options: [
        'Because DOM nodes are created and destroyed dynamically as user scrolls, maintaining fixed ~10 DOM elements',
        'Because it compresses objects into zip files in memory',
        'Because JavaScript ignores items past index 100',
        'Because browser RAM is unlimited',
      ],
      correct: 0,
      explanation: 'Virtualization calculates top offsets and recycles a small window of DOM elements, keeping RAM footprint under 5MB.',
    },
  ],
}
