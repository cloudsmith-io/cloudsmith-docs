import { createIcon } from '../../util/create-icon';

export const DocsApiIcon = createIcon('docs/api', () => ({
  fill: 'none',
  children: (
    <>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.8929 2.82336H3.10613L1.81323 4.11626V11.8837L3.10613 13.1766H12.8929L14.1858 11.8837V4.11626L12.8929 2.82336ZM2.81323 4.53047L3.52034 3.82336L12.4787 3.82337L13.1858 4.53047V11.4695L12.4787 12.1766H3.52034L2.81323 11.4695V4.53047ZM4.33484 6.07676L6.24209 7.70564V8.29477L4.33484 9.92365L4.98427 10.6841L7.24209 8.75579V7.24463L4.98427 5.31635L4.33484 6.07676Z"
        fill="var(--base-color-white)"
      />
    </>
  ),
}));
