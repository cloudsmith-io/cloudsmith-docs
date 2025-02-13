import { createIcon } from '../../util/create-icon';

export const FormatHexIcon = createIcon('format/hex', (props) => ({
  ...props,
  fill: 'none',
  children: (
    <>
      <path
        fillRule="evenodd"
        clip-rule="evenodd"
        d="M12.1844 7.34378L8.15195 9.6719V14.3281L12.1844 16.6563L16.2168 14.3281V9.6719L12.1844 7.34378ZM19.9509 7.51603L12.1844 3.03204L4.41788 7.51603V16.484L12.1844 20.968L19.9509 16.484V7.51603Z"
        fill="currentColor"
      />
    </>
  ),
}));
