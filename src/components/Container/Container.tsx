import styles from './Container.module.css';

export function Container({ children, className }) {

  return <div className={}

}

export namespace Container {
  export interface Props extends React.ComponentPropsWithoutRef<'div'> {
    children: React.ReactNode;
    className: string;
  }
}
