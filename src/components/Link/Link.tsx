import NextLink from 'next/link';
import type { Route } from 'next';

export function Link({ href, children, ...rest }: LinkProps) {
  // TODO:Improve how we determine if a link is external
  const isExternal = isExternalUrl(href.toString(), 'cloudsmith.com');
  const newLinkProps = { ...rest };

  if (isExternal) {
    newLinkProps.rel = 'noopener noreferrer';
    newLinkProps.target = '_blank';
  }

  // TODO: Maybe add icon on external links?
  return (
    <>
      {isExternal ? (
        <a href={href.toString()} {...newLinkProps}>
          {children}
        </a>
      ) : (
        <NextLink href={href} {...newLinkProps}>
          {children}
        </NextLink>
      )}
    </>
  );
}

const isExternalUrl = (url: string, domain: string) => {
  const urlLowerCase = url.toLowerCase();
  const firstCharacter = urlLowerCase.charAt(0);

  if (firstCharacter === '#' || firstCharacter === '/') {
    return false;
  }

  if (urlLowerCase.startsWith('http://') || urlLowerCase.startsWith('https://')) {
    const urlNoProtocol = urlLowerCase.replace('http://', '').replace('https://', '');
    const potentialDomain = urlNoProtocol.split('/')[0];

    if (potentialDomain !== domain) {
      return true;
    }
  }

  return false;
};

interface LinkProps extends React.ComponentPropsWithoutRef<'a'> {
  href: Route<string>;
}
