# Changelog

## [2.0.0](https://github.com/Norgate-AV/react-crestron-ch5-hooks/compare/v1.1.0...v2.0.0) (2026-04-05)

### ⚠ BREAKING CHANGES

- React peer dependency minimum raised from >=16 to >=18

### 🌟 Features

- migrate to @norgate-av/ch5-crcomlib and drop ch5-helper dependency ([9327a99](https://github.com/Norgate-AV/react-crestron-ch5-hooks/commit/9327a992caddb399194bb79432816e169f1e36db))
- **hooks:** seed initial state from getState on mount ([fdd7e0f](https://github.com/Norgate-AV/react-crestron-ch5-hooks/commit/fdd7e0f31714de9843383cbb859cb8d6b249a6b3))

## [1.1.0](https://github.com/Norgate-AV/react-crestron-ch5-hooks/compare/v1.0.0...v1.1.0) (2026-04-03)

### 🌟 Features

- **hooks:** add hold(duration) to digital publish hooks ([780c607](https://github.com/Norgate-AV/react-crestron-ch5-hooks/commit/780c60746725acec9508cf540cfeb6e3ed9bf8eb))
- replace jest with vitest ([c0fe3e4](https://github.com/Norgate-AV/react-crestron-ch5-hooks/commit/c0fe3e442cbea2255c27d5d9858ac17185af6cf2))

### 🐛 Bug Fixes

- **hooks:** pass explicit undefined to useRef for React 19 compatibility ([927334b](https://github.com/Norgate-AV/react-crestron-ch5-hooks/commit/927334bb84973ba122cadcdf5d4a68ab4b6893af))
- **deps:** update @crestron/ch5-crcomlib peer dependency to ^2.0.0 ([dc4db0c](https://github.com/Norgate-AV/react-crestron-ch5-hooks/commit/dc4db0ca0a6387844f9ff21de9c04dc45e30d3f0)), closes [#148](https://github.com/Norgate-AV/react-crestron-ch5-hooks/issues/148)
- **hooks:** use Array.from factory to avoid shared initial state reference ([655592a](https://github.com/Norgate-AV/react-crestron-ch5-hooks/commit/655592a30726758595263345fc06a2fcfe7c2dca))

### 🧰 Chores

- add @vitest/coverage-v8 package ([73d7e93](https://github.com/Norgate-AV/react-crestron-ch5-hooks/commit/73d7e934785ce8b1c09d57610b393c2cff5c2d97))
- **semantic-release:** add changelog and git plugins ([404d95f](https://github.com/Norgate-AV/react-crestron-ch5-hooks/commit/404d95fb72eecd82e1aec542d485047141ced4f7))
- **git:** add gitattributes file ([8af0653](https://github.com/Norgate-AV/react-crestron-ch5-hooks/commit/8af0653fe4def0e30a8be75a33caf469e4074457))
- **node:** add nvmrc file ([9f0ab40](https://github.com/Norgate-AV/react-crestron-ch5-hooks/commit/9f0ab40c5b456155fcd3b4fe1d5dcead7ce59c0d))
- add vitest package ([1efbdee](https://github.com/Norgate-AV/react-crestron-ch5-hooks/commit/1efbdeedcfcf199222a36ef4504bf8c658082003))
- **deps-dev:** bump @commitlint/cli from 16.2.3 to 16.2.4 ([#25](https://github.com/Norgate-AV/react-crestron-ch5-hooks/issues/25)) ([6e734e0](https://github.com/Norgate-AV/react-crestron-ch5-hooks/commit/6e734e021eaf8d9887c6fce5cd1fa1a821182955))
- **deps-dev:** bump @commitlint/cli from 16.2.4 to 17.0.0 ([#42](https://github.com/Norgate-AV/react-crestron-ch5-hooks/issues/42)) ([00d32c5](https://github.com/Norgate-AV/react-crestron-ch5-hooks/commit/00d32c537ae6c0ceb06845f80fb89989ca3dfbfd))
- **deps-dev:** bump @commitlint/cli from 17.0.0 to 17.0.1 ([#53](https://github.com/Norgate-AV/react-crestron-ch5-hooks/issues/53)) ([fcb0011](https://github.com/Norgate-AV/react-crestron-ch5-hooks/commit/fcb0011464a6addfc036d43b833729545ff9b00c))
- **deps-dev:** bump @commitlint/cli from 17.0.1 to 17.0.2 ([#57](https://github.com/Norgate-AV/react-crestron-ch5-hooks/issues/57)) ([96d4fc0](https://github.com/Norgate-AV/react-crestron-ch5-hooks/commit/96d4fc0233fa40336e7ca93829c1ac2071dfe527))
- **deps-dev:** bump @commitlint/config-conventional ([#24](https://github.com/Norgate-AV/react-crestron-ch5-hooks/issues/24)) ([da60e4a](https://github.com/Norgate-AV/react-crestron-ch5-hooks/commit/da60e4a055d61e9d4757207efae8b6eabdc86c5d))
- **deps-dev:** bump @commitlint/config-conventional ([#40](https://github.com/Norgate-AV/react-crestron-ch5-hooks/issues/40)) ([83bed85](https://github.com/Norgate-AV/react-crestron-ch5-hooks/commit/83bed85705438797e6261a53d49114df1a11f060))
- **deps-dev:** bump @commitlint/config-conventional ([#65](https://github.com/Norgate-AV/react-crestron-ch5-hooks/issues/65)) ([61aeb99](https://github.com/Norgate-AV/react-crestron-ch5-hooks/commit/61aeb99fb8a819c851b33c8b71d6c6328d544dfc))
- **deps-dev:** bump @norgate-av/crestron-ch5-helper ([#46](https://github.com/Norgate-AV/react-crestron-ch5-hooks/issues/46)) ([ee6f69d](https://github.com/Norgate-AV/react-crestron-ch5-hooks/commit/ee6f69de1dd6ddd9c300dc2176e624ab3b9fab2d))
- **deps-dev:** bump @testing-library/react from 13.1.1 to 13.2.0 ([#36](https://github.com/Norgate-AV/react-crestron-ch5-hooks/issues/36)) ([1cead54](https://github.com/Norgate-AV/react-crestron-ch5-hooks/commit/1cead549e20400d564b8bc66e61f8541995923de))
- **deps-dev:** bump @testing-library/react from 13.2.0 to 13.3.0 ([#49](https://github.com/Norgate-AV/react-crestron-ch5-hooks/issues/49)) ([cb56db3](https://github.com/Norgate-AV/react-crestron-ch5-hooks/commit/cb56db3c6d57ebf50cc0a43d7f8ddb9f99765e6e))
- **deps-dev:** bump @types/react from 18.0.6 to 18.0.7 ([#19](https://github.com/Norgate-AV/react-crestron-ch5-hooks/issues/19)) ([f8b62a6](https://github.com/Norgate-AV/react-crestron-ch5-hooks/commit/f8b62a6c4fa787f31d181bd8bf50c415a08e093f))
- **deps-dev:** bump @types/react from 18.0.7 to 18.0.8 ([#22](https://github.com/Norgate-AV/react-crestron-ch5-hooks/issues/22)) ([07dc8b9](https://github.com/Norgate-AV/react-crestron-ch5-hooks/commit/07dc8b988837b25e8cc3f364894b92d965e38ab9))
- **deps-dev:** bump @types/react from 18.0.8 to 18.0.9 ([#35](https://github.com/Norgate-AV/react-crestron-ch5-hooks/issues/35)) ([334bff4](https://github.com/Norgate-AV/react-crestron-ch5-hooks/commit/334bff4e6d5cb868c4c12bfcf7515b16cb993028))
- **deps-dev:** bump @types/react-dom from 18.0.2 to 18.0.3 ([#29](https://github.com/Norgate-AV/react-crestron-ch5-hooks/issues/29)) ([a626989](https://github.com/Norgate-AV/react-crestron-ch5-hooks/commit/a62698903cdb186bd05128f19c956f20c5c9458e))
- **deps-dev:** bump @types/react-dom from 18.0.3 to 18.0.4 ([#39](https://github.com/Norgate-AV/react-crestron-ch5-hooks/issues/39)) ([11f27fa](https://github.com/Norgate-AV/react-crestron-ch5-hooks/commit/11f27fa378f50f0bdb19ef8d6d4898cdd64eb9b6))
- **deps-dev:** bump @types/react-dom from 18.0.4 to 18.0.5 ([#52](https://github.com/Norgate-AV/react-crestron-ch5-hooks/issues/52)) ([5e77509](https://github.com/Norgate-AV/react-crestron-ch5-hooks/commit/5e775097be49eac3a1365e6494b0522d0240256c))
- **deps-dev:** bump @typescript-eslint/eslint-plugin ([#17](https://github.com/Norgate-AV/react-crestron-ch5-hooks/issues/17)) ([48d76ed](https://github.com/Norgate-AV/react-crestron-ch5-hooks/commit/48d76ed919f5eeb46f25c42e2b3b7fd6d087489c))
- **deps-dev:** bump @typescript-eslint/eslint-plugin ([#30](https://github.com/Norgate-AV/react-crestron-ch5-hooks/issues/30)) ([708dc85](https://github.com/Norgate-AV/react-crestron-ch5-hooks/commit/708dc85df6bdbe7bcf00c872ef0d2fd37c8d5b2f))
- **deps-dev:** bump @typescript-eslint/eslint-plugin ([#37](https://github.com/Norgate-AV/react-crestron-ch5-hooks/issues/37)) ([9afb93c](https://github.com/Norgate-AV/react-crestron-ch5-hooks/commit/9afb93cb54159ebbcb7b2669dce8668770f59c78))
- **deps-dev:** bump @typescript-eslint/eslint-plugin ([#41](https://github.com/Norgate-AV/react-crestron-ch5-hooks/issues/41)) ([2dfe865](https://github.com/Norgate-AV/react-crestron-ch5-hooks/commit/2dfe865bd08081775fa896927de21a594ea4f755))
- **deps-dev:** bump @typescript-eslint/eslint-plugin ([#50](https://github.com/Norgate-AV/react-crestron-ch5-hooks/issues/50)) ([4a53ec3](https://github.com/Norgate-AV/react-crestron-ch5-hooks/commit/4a53ec32f91b548eeb9e1ebd05745ce21fc7726b))
- **deps-dev:** bump @typescript-eslint/eslint-plugin ([#64](https://github.com/Norgate-AV/react-crestron-ch5-hooks/issues/64)) ([66865e8](https://github.com/Norgate-AV/react-crestron-ch5-hooks/commit/66865e8aa5d858f4c7c3429da127756606af6902))
- **deps-dev:** bump @typescript-eslint/parser from 5.20.0 to 5.21.0 ([#20](https://github.com/Norgate-AV/react-crestron-ch5-hooks/issues/20)) ([776c5e5](https://github.com/Norgate-AV/react-crestron-ch5-hooks/commit/776c5e58a748b4034cb8676085d23375198a3914))
- **deps-dev:** bump @typescript-eslint/parser from 5.21.0 to 5.22.0 ([#28](https://github.com/Norgate-AV/react-crestron-ch5-hooks/issues/28)) ([535ffef](https://github.com/Norgate-AV/react-crestron-ch5-hooks/commit/535ffef28459e61c3400067e49a234513c610e34))
- **deps-dev:** bump @typescript-eslint/parser from 5.22.0 to 5.23.0 ([#34](https://github.com/Norgate-AV/react-crestron-ch5-hooks/issues/34)) ([2e344b8](https://github.com/Norgate-AV/react-crestron-ch5-hooks/commit/2e344b8530761aa16dc57e34b2e66ffcbf74b4ae))
- **deps-dev:** bump @typescript-eslint/parser from 5.23.0 to 5.24.0 ([#38](https://github.com/Norgate-AV/react-crestron-ch5-hooks/issues/38)) ([5bf6b1b](https://github.com/Norgate-AV/react-crestron-ch5-hooks/commit/5bf6b1b2a8bbf173669e83a61dcfcb87988de55e))
- **deps-dev:** bump @typescript-eslint/parser from 5.24.0 to 5.27.0 ([#51](https://github.com/Norgate-AV/react-crestron-ch5-hooks/issues/51)) ([c94c6dd](https://github.com/Norgate-AV/react-crestron-ch5-hooks/commit/c94c6dd53b617d5b118e8f4648c605c22e18dd34))
- **deps-dev:** bump @typescript-eslint/parser from 5.27.0 to 5.28.0 ([#63](https://github.com/Norgate-AV/react-crestron-ch5-hooks/issues/63)) ([7d3128b](https://github.com/Norgate-AV/react-crestron-ch5-hooks/commit/7d3128b9fca89e81564fd14ab97bf7f299edb33d))
- **deps-dev:** bump @typescript-eslint/parser from 5.28.0 to 5.30.7 ([#83](https://github.com/Norgate-AV/react-crestron-ch5-hooks/issues/83)) ([04720b0](https://github.com/Norgate-AV/react-crestron-ch5-hooks/commit/04720b01a22b5984de6707d8b69c08677ebec9b2))
- **deps:** bump deps ([2bf2b78](https://github.com/Norgate-AV/react-crestron-ch5-hooks/commit/2bf2b78b13b9ef798c1213237793001cfee76f56))
- **deps:** bump deps ([57be263](https://github.com/Norgate-AV/react-crestron-ch5-hooks/commit/57be2632188d6720048065faa4de2a3965b99076))
- **deps-dev:** bump doctoc from 2.1.0 to 2.2.0 ([#32](https://github.com/Norgate-AV/react-crestron-ch5-hooks/issues/32)) ([dbc5441](https://github.com/Norgate-AV/react-crestron-ch5-hooks/commit/dbc54411c91955486190316ddc80dc47f9f638c6))
- **deps-dev:** bump eslint from 8.14.0 to 8.15.0 ([#33](https://github.com/Norgate-AV/react-crestron-ch5-hooks/issues/33)) ([2dd9036](https://github.com/Norgate-AV/react-crestron-ch5-hooks/commit/2dd90364bf2ef4e470e09bbe924548a31f46ce30))
- **deps-dev:** bump eslint from 8.15.0 to 8.16.0 ([#44](https://github.com/Norgate-AV/react-crestron-ch5-hooks/issues/44)) ([517d441](https://github.com/Norgate-AV/react-crestron-ch5-hooks/commit/517d441adc4bc8eeb9e2f2c49921d99db771b667))
- **deps-dev:** bump eslint from 8.16.0 to 8.17.0 ([#60](https://github.com/Norgate-AV/react-crestron-ch5-hooks/issues/60)) ([e1893b3](https://github.com/Norgate-AV/react-crestron-ch5-hooks/commit/e1893b3b6b87e0a1d6a88e83a02c39d7c225310a))
- **deps-dev:** bump eslint-plugin-react from 7.29.4 to 7.30.0 ([#43](https://github.com/Norgate-AV/react-crestron-ch5-hooks/issues/43)) ([35d23c6](https://github.com/Norgate-AV/react-crestron-ch5-hooks/commit/35d23c65b6b15ef903bfeaf771c7f5e4a9291daa))
- **deps-dev:** bump eslint-plugin-react-hooks from 4.4.0 to 4.5.0 ([#21](https://github.com/Norgate-AV/react-crestron-ch5-hooks/issues/21)) ([e847ef6](https://github.com/Norgate-AV/react-crestron-ch5-hooks/commit/e847ef62a08d854c8e6976b72f0cd4a5cf4fab0f))
- **deps-dev:** bump eslint-plugin-react-hooks from 4.5.0 to 4.6.0 ([#69](https://github.com/Norgate-AV/react-crestron-ch5-hooks/issues/69)) ([8099dac](https://github.com/Norgate-AV/react-crestron-ch5-hooks/commit/8099dac8a4a1d6a2f830a637d2d889038ac6aea2))
- **deps-dev:** bump husky from 7.0.4 to 8.0.1 ([#31](https://github.com/Norgate-AV/react-crestron-ch5-hooks/issues/31)) ([5e44422](https://github.com/Norgate-AV/react-crestron-ch5-hooks/commit/5e4442229804036bc57825d4338d8b4c66eb449a))
- **deps-dev:** bump lint-staged from 12.4.0 to 12.4.1 ([#18](https://github.com/Norgate-AV/react-crestron-ch5-hooks/issues/18)) ([45ce72c](https://github.com/Norgate-AV/react-crestron-ch5-hooks/commit/45ce72cd080f9ef717d8498a4be37ef97bf018cf))
- **deps-dev:** bump lint-staged from 12.4.1 to 12.4.3 ([#54](https://github.com/Norgate-AV/react-crestron-ch5-hooks/issues/54)) ([a311ee0](https://github.com/Norgate-AV/react-crestron-ch5-hooks/commit/a311ee07eced257432d39aeb5b9c4e5df315df7b))
- **deps-dev:** bump lint-staged from 12.4.3 to 13.0.2 ([#68](https://github.com/Norgate-AV/react-crestron-ch5-hooks/issues/68)) ([76cf492](https://github.com/Norgate-AV/react-crestron-ch5-hooks/commit/76cf492712f1c34cb51654ba3044f98acf5b5cce))
- **deps:** bump npm from 8.6.0 to 8.12.0 ([#55](https://github.com/Norgate-AV/react-crestron-ch5-hooks/issues/55)) ([3deb9ed](https://github.com/Norgate-AV/react-crestron-ch5-hooks/commit/3deb9ed5863b5f20d5c806863d9c533fa6f74802))
- **deps-dev:** bump prettier from 2.6.2 to 2.7.1 ([#70](https://github.com/Norgate-AV/react-crestron-ch5-hooks/issues/70)) ([2f446aa](https://github.com/Norgate-AV/react-crestron-ch5-hooks/commit/2f446aaf6af50109b7311915e9f9ab2e017bfcc5))
- **deps-dev:** bump react from 18.0.0 to 18.1.0 ([#23](https://github.com/Norgate-AV/react-crestron-ch5-hooks/issues/23)) ([31b1741](https://github.com/Norgate-AV/react-crestron-ch5-hooks/commit/31b174102330c2d45db02bcc05a5d6bb366945e9))
- **deps-dev:** bump react-dom from 18.0.0 to 18.1.0 ([#26](https://github.com/Norgate-AV/react-crestron-ch5-hooks/issues/26)) ([3a7fd16](https://github.com/Norgate-AV/react-crestron-ch5-hooks/commit/3a7fd166c6e1d32d729ab2ef767ffda80f84cdfc))
- **deps-dev:** bump semantic-release from 19.0.2 to 19.0.3 ([#62](https://github.com/Norgate-AV/react-crestron-ch5-hooks/issues/62)) ([9501060](https://github.com/Norgate-AV/react-crestron-ch5-hooks/commit/9501060883ed7f87e11745e334ceb8ced4843105))
- **deps-dev:** bump semantic-release from 19.0.2 to 19.0.3 ([#67](https://github.com/Norgate-AV/react-crestron-ch5-hooks/issues/67)) ([88e8f5c](https://github.com/Norgate-AV/react-crestron-ch5-hooks/commit/88e8f5ca77e5148a7368d4f7c80f45412859d876))
- **deps:** bump semver-regex from 3.1.3 to 3.1.4 ([#56](https://github.com/Norgate-AV/react-crestron-ch5-hooks/issues/56)) ([5c15b48](https://github.com/Norgate-AV/react-crestron-ch5-hooks/commit/5c15b4855bb7f4c7b720d79561e5e371cfd8de28))
- **deps:** bump terser from 4.8.0 to 4.8.1 ([#84](https://github.com/Norgate-AV/react-crestron-ch5-hooks/issues/84)) ([bf98a33](https://github.com/Norgate-AV/react-crestron-ch5-hooks/commit/bf98a336caebf8fafd1c34c5acec24c09229c1dc))
- **node:** bump to 24.14.1 ([9f62953](https://github.com/Norgate-AV/react-crestron-ch5-hooks/commit/9f62953858e63ff0b626af1abc79f44e33a28a90))
- **deps-dev:** bump typescript from 4.6.3 to 4.6.4 ([#27](https://github.com/Norgate-AV/react-crestron-ch5-hooks/issues/27)) ([5184e9b](https://github.com/Norgate-AV/react-crestron-ch5-hooks/commit/5184e9b014fded60663a209ff33d148211f8e53a))
- **deps-dev:** bump typescript from 4.6.4 to 4.7.2 ([#48](https://github.com/Norgate-AV/react-crestron-ch5-hooks/issues/48)) ([e04a331](https://github.com/Norgate-AV/react-crestron-ch5-hooks/commit/e04a331df6c04c6f3dd4d9d0fbee2c4f3d101ec7))
- **deps-dev:** bump typescript from 4.7.2 to 4.7.3 ([#58](https://github.com/Norgate-AV/react-crestron-ch5-hooks/issues/58)) ([4632cb2](https://github.com/Norgate-AV/react-crestron-ch5-hooks/commit/4632cb2285a553b89271521c1e42b3cb52c5771f))
- **deps-dev:** bump typescript from 4.7.3 to 4.7.4 ([#73](https://github.com/Norgate-AV/react-crestron-ch5-hooks/issues/73)) ([ca37aab](https://github.com/Norgate-AV/react-crestron-ch5-hooks/commit/ca37aab83be6f66655bdf94b2da50cba83bbe7b4))
- **dependabot:** check for updates weekly ([6705404](https://github.com/Norgate-AV/react-crestron-ch5-hooks/commit/67054049826cff3a0c01417658c52b1625ba289c))
- merge master into develop [#16](https://github.com/Norgate-AV/react-crestron-ch5-hooks/issues/16) ([f50d418](https://github.com/Norgate-AV/react-crestron-ch5-hooks/commit/f50d418e98f19d6be714b4c9608a41b2c962dd11))
- remove crestron prop from package.json ([44eee87](https://github.com/Norgate-AV/react-crestron-ch5-hooks/commit/44eee87cddec3f9d616eb554adcb1efd088985b5))
- remove eslint ([3366ce5](https://github.com/Norgate-AV/react-crestron-ch5-hooks/commit/3366ce5ddff9b07df6dc6869745ac915634f19a0))
- remove redundant packages ([90a02e4](https://github.com/Norgate-AV/react-crestron-ch5-hooks/commit/90a02e46f6be59452a7a54bdfe3ceb4c9c9c9c6d))
- remove size limit package ([46be6fe](https://github.com/Norgate-AV/react-crestron-ch5-hooks/commit/46be6fe3114dbbf755c399976c442bbb8a7dcfd1))
- remove sponge, nodejq, runscript-os ([eb46faa](https://github.com/Norgate-AV/react-crestron-ch5-hooks/commit/eb46faa3bbf58d5ee742628ce3f43e93b08d5ef8))
- remove tsup schema ([396b1a1](https://github.com/Norgate-AV/react-crestron-ch5-hooks/commit/396b1a173aada9fbd4bbebff01df59cd5f58be2a))
- switch to pnpm ([fdaa5df](https://github.com/Norgate-AV/react-crestron-ch5-hooks/commit/fdaa5df5e944608d56ba63656e9a1abcc635c358))
- **semantic-release:** update config ([6ff906d](https://github.com/Norgate-AV/react-crestron-ch5-hooks/commit/6ff906dca359e91ee9f285b97d0949dce4a90300))
- update git hooks ([311c268](https://github.com/Norgate-AV/react-crestron-ch5-hooks/commit/311c26804d2422e6b287cfcda9028f21c25bc4bf))
- update license ([e0e74b4](https://github.com/Norgate-AV/react-crestron-ch5-hooks/commit/e0e74b418bf1ec733be809fe3c8d1694ee292a43))
- update node in package.json to 20 ([3cd8b69](https://github.com/Norgate-AV/react-crestron-ch5-hooks/commit/3cd8b6959a74d42662504ff4bc7c771d1ee259d1))

### 📖 Documentation

- update badges to point at master ([7924a95](https://github.com/Norgate-AV/react-crestron-ch5-hooks/commit/7924a951eb46f22ac5d4629b9448e501943b0186))
- update readme ([6cfdea3](https://github.com/Norgate-AV/react-crestron-ch5-hooks/commit/6cfdea32fe93d8b5eb15b108b62622e6a27e5042))
- update repo urls ([8b029fd](https://github.com/Norgate-AV/react-crestron-ch5-hooks/commit/8b029fd71a1195007fb38ce08df43b0eced4c80a))

### ✨ Refactor

- **hooks:** delegate click() to hold(0) for consistent async release ([8e7b823](https://github.com/Norgate-AV/react-crestron-ch5-hooks/commit/8e7b823847a1db076d5c9207b2996ee6cf76654a))
- remove redundant declare keyword ([b29bf0c](https://github.com/Norgate-AV/react-crestron-ch5-hooks/commit/b29bf0c979bb98d35e7431599e45c62561b6703d))

### 🚀 Performance

- **hooks:** memoize publish hook actions with useCallback and useMemo ([cbf3af4](https://github.com/Norgate-AV/react-crestron-ch5-hooks/commit/cbf3af4c5a136d49aca09942fc0dce6373f7475a))

### 🧪 Tests

- add coverage config ([5aca83f](https://github.com/Norgate-AV/react-crestron-ch5-hooks/commit/5aca83f61d33ea133c36391e1bf5bc7d1adb7921))
- add crcomlib shim ([26f9f1e](https://github.com/Norgate-AV/react-crestron-ch5-hooks/commit/26f9f1e7394931b1bdc274255549ba4588f8b906))
- improve coverage and fix describe block names ([4ae285b](https://github.com/Norgate-AV/react-crestron-ch5-hooks/commit/4ae285b29e9633f2e7309304b5b2b29d230eca89))
- reduce suite run time from ~97s to ~20s ([699b823](https://github.com/Norgate-AV/react-crestron-ch5-hooks/commit/699b823568d4c1fee5437e0df7812799d32e78ca))

### 🛠️ Build

- update tsconfig ([d57c921](https://github.com/Norgate-AV/react-crestron-ch5-hooks/commit/d57c92170eff8836c92e95fe67f37b4d797b54cb))

### 🤖 CI

- **main:** add git env variables for semantic-release ([f12f0bf](https://github.com/Norgate-AV/react-crestron-ch5-hooks/commit/f12f0bf8baef95055319263373268823fabc6f5a))
- add pnpm install step in build job ([781b464](https://github.com/Norgate-AV/react-crestron-ch5-hooks/commit/781b464a8289d519d8b6eecdaaeea1af4829dd91))
- fix lint command ([db60b61](https://github.com/Norgate-AV/react-crestron-ch5-hooks/commit/db60b61abf4354a4dcc604f6cb0460c747f3cfaa))
- remove maxWorkers arg from test:coverage script ([7afaf0f](https://github.com/Norgate-AV/react-crestron-ch5-hooks/commit/7afaf0fe328ee5ff4e4721a0bce1f516c299435a))
- remove redundant workflows ([129ef76](https://github.com/Norgate-AV/react-crestron-ch5-hooks/commit/129ef76175242cdde58fdee0018809f9b942acc8))
- update size-limit workflow ([741c9b6](https://github.com/Norgate-AV/react-crestron-ch5-hooks/commit/741c9b651aad84eb38eaa474625ed523656bbee2))
- update workflow ([6192bd9](https://github.com/Norgate-AV/react-crestron-ch5-hooks/commit/6192bd96a65069a1b453bc4412e86b2047cd399e))
- update workflow ([54c9038](https://github.com/Norgate-AV/react-crestron-ch5-hooks/commit/54c9038331df335153fa0be8134877b47a22db84))
- update workflow for trusted publishing ([2dec136](https://github.com/Norgate-AV/react-crestron-ch5-hooks/commit/2dec1368e13290728609ddcb0bb7f284856fe46d))
- **main:** use custom install command ([57bc423](https://github.com/Norgate-AV/react-crestron-ch5-hooks/commit/57bc42363b44e6c7e177adccae54d91164651fa4))
- use npm script for test:coverage ([9959fd7](https://github.com/Norgate-AV/react-crestron-ch5-hooks/commit/9959fd7357518c4ed71521bfe23e941031d492e9))
