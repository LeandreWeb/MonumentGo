import CircuitMonument from "../../src/features/CircuitPage/components/CircuitMonument.vue";
import { it, expect, describe, beforeEach, vi, vitest } from "vitest";
import { mount, shallowMount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { router } from "../../src/router";

const mountOptions = {
  global: {
    mocks: {
      $router: {
        push: vi.fn(),
      },
    },
    plugins: [router],
  },
};

describe('Sprint 3 - CircuitMonument.vue', () => {
  let wrapper;

  beforeEach(() => {
    setActivePinia(createPinia());
    wrapper = mount(CircuitMonument, mountOptions);
  });

  const monument = {
    id: 92625,
    name: 'Maison Daniel-Kneen',
    mainPhoto: 'https://www.patrimoine-culturel.gouv.qc.ca/rpcq/document/rpcq_bien_92625_348591.JPG?id=348591',
    civicNumber: '2090',
    street: ' rue Jeanne-Mance',
    city: 'Montreal',
    year: '1886',
  };
  const index = 0;

  it('renders monument name correctly', () => {
    const wrapper = mount(CircuitMonument, {
      props: { monument, index },
    });
    expect(wrapper.find('.circuitMonument-name').text()).toBe(monument.name);
  });

  it('renders monument address correctly', () => {
    const wrapper = mount(CircuitMonument, {
      props: { monument, index },
    });
    expect(wrapper.find('.circuitMonument-address').text()).toContain(`${monument.civicNumber} ${monument.street}`);
    expect(wrapper.find('.circuitMonument-address').text()).toContain(monument.city);
  });

  it('renders monument year correctly', () => {
    const wrapper = mount(CircuitMonument, {
      props: { monument, index },
    });
    expect(wrapper.find('.circuitMonument-year').text()).toBe(`Année: ${monument.year}`);
  });

  it('has a clickable router link', () => {
    const wrapper = mount(CircuitMonument, {
      props: { monument, index },
    });
    expect(wrapper.find('.circuitMonument-link').exists()).toBe(true);
    expect(wrapper.find('.circuitMonument-link').attributes('to')).toBe(`/monuments/${monument.id}`);
  });


});