import Download from "../../src/features/DownloadPage/components/Download.vue";
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

describe('Sprint 3 - Download.vue', () => {
  let wrapper;

  beforeEach(() => {
    setActivePinia(createPinia());
    wrapper = mount(Download, mountOptions);
  });

  it("should displays download buttons", () => {
    const downloadBtns = wrapper.find(".download-btns");
    expect(downloadBtns.exists()).toBe(true);
  });

  it("clicking download buttons should redirects to correct URL", () => {
    const appStoreBtn = wrapper.find(".btn-download-appstore");
    const playStoreBtn = wrapper.find(".btn-download-playstore");
    const appStoreUrl = "https://www.apple.com/ca/fr/app-store/";
    const playStoreUrl = "https://play.google.com/store/apps?hl=fr_CA&gl=US";
  
    expect(appStoreBtn.exists()).toBe(true);
    expect(playStoreBtn.exists()).toBe(true);
  
    // Ouvrir l'URL de destination à l'aide de window.open()
    const windowOpenSpy = vi.spyOn(window, "open").mockImplementation((url?: any, target?: string) => {
      return window;
    });
  
    appStoreBtn.trigger("click");
    expect(windowOpenSpy).toHaveBeenCalledWith(appStoreUrl, "_blank");
  
    playStoreBtn.trigger("click");
    expect(windowOpenSpy).toHaveBeenCalledWith(playStoreUrl, "_blank");
  
    windowOpenSpy.mockRestore();
  });
});