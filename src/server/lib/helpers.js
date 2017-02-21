import ContextWrapper from '../../shared/components/common/ContextWrapper.jsx';
import { renderToString, renderToStaticMarkup } from 'inferno-server';
import { RouterContext } from 'inferno-router';
import fetch from 'fetch-everywhere';

export function extractComponents(mProps, mComponents) {
  const matchedComponents = mComponents || [];

  matchedComponents.push(mProps.component);

  if (!mProps.children) {
    return matchedComponents;
  }

  return extractComponents(mProps.children.props, matchedComponents);

}

export function mapComponentsToPromises(components, params) {
  const filteredComponents = components.filter((Component) => {
    return (typeof Component.requestData === 'function');
  });

  const promises = filteredComponents.map((Component) => {
    return Component.requestData(params, "http://localhost:3000");
  });

  return { promises: promises, components: filteredComponents };

}

export function prepareData(values, components) {
  const map = {};

  values.forEach((value) => {
    map[components[0].NAME] = value;
  })

  return map;
}

export function render(renderProps, data) {
  let html = renderToString(<ContextWrapper data={data} ><RouterContext {...renderProps} /></ContextWrapper>);
  return html;
}
