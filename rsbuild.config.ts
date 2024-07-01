import { defineConfig } from '@rsbuild/core';
import { pluginVue } from '@rsbuild/plugin-vue';
import { ModuleFederationPlugin } from '@module-federation/enhanced/rspack';

export default defineConfig({
  server: {
    port: 4000,
  },
  dev: {
    // 必须要配置 assetPrefix，在生产环境需要配置 output.assetPrefix
    assetPrefix: 'http://localhost:4000',
  },
  tools: {
    rspack: (config, { appendPlugins }) => {
      // 需要设置一个唯一值不能和其他应用相等
      config.output!.uniqueName = 'vue_provider';
      appendPlugins([
        new ModuleFederationPlugin({
          name: 'vue_provider',
          dts: {
            generateTypes: {
              compilerInstance: 'vue-tsc',
            },
          },
          exposes: {
            './Button': './src/Button.vue',
          },
          shared: ['vue'],
        }),
      ]);
    },
  },
  plugins: [pluginVue()],
});
