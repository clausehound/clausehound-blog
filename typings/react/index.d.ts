declare namespace React {
  function createElement<P extends { children?: ReactNode }>(
    type: FunctionComponent<P> | ComponentClass<P>,
    props?: Attributes & P | null,
  ): ReactElement<P>;
  function createElement<P extends { children?: ReactNode }>(
    type: FunctionComponent<P> | ComponentClass<P>,
    props: Attributes & Pick<P, Exclude<keyof P, 'children'>> | null,
    firstKid: P['children'],
    ...children: P['children'][]
  ): ReactElement<P>;
}
