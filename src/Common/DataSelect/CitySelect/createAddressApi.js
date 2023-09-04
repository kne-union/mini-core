import memoize from "lodash/memoize";
import cloneDeep from 'lodash/cloneDeep';

const createAddressApi = ({city, province, country}) => {
  const getSearchList = memoize(() => {
    const list = [];
    ["gangaotai", "municipality"].forEach((name) => {
      list.push(...city.relations[name]);
    });
    ["provinces", "continents"].forEach((name) => {
      city.relations[name].forEach((id) => {
        list.push(id);
        list.push(...city.relations[id]);
      });
    });

    return list.map((id) => {
      return city.list[id];
    });
  });

  return {
    getCity: memoize((id) => {
      const item = city.list[id];
      if (!item) {
        return {
          city: null, parent: null,
        };
      }
      return {
        city: item, parent: item.parentCode ? city.list[item.parentCode] : null,
      };
    }), getChinaHotCities: memoize(() => {
      return city.relations["2"].map((id) => city.list[id]);
    }), getChinaCities: memoize(() => {
      return ["2", ...province.relations.municipality, ...province.relations.provinces, "gangaotai",].map((id) => Object.assign({id}, city.list[id]));
    }), getCountries: memoize(() => {
      return ["1", ...country.relations.continents].map((id) => Object.assign({id}, country.list[id]));
    }), getList: memoize((pid, options) => {
      const {showChinaQuan, showForeignQuan} = Object.assign({}, options);
      if (pid === "gangaotai") {
        return province.relations["gangaotai"].map((id) => city.list[id]);
      }
      const current = Object.assign({}, city.list[pid]);
      if (province.relations.municipality.indexOf(pid) > -1) {
        current.name = `${showChinaQuan ? "全" : ""}` + current.name;

        return [current];
      }

      const list = city.relations[pid].map((id) => city.list[id]);
      if (province.relations.provinces.indexOf(pid) > -1 && showChinaQuan) {
        current.name = `全` + current.name;
        list.splice(0, 0, current);
      }
      if (country.relations.continents.indexOf(pid) > -1 && showForeignQuan) {
        current.name = `全` + current.name;
        list.splice(0, 0, current);
      }
      return list;
    }), getNationalityList: memoize((pid) => {
      let _city = cloneDeep(city);
      if (pid === "1") {
        _city.relations["1"].unshift("410");
      }
      if (pid === "350") {
        _city.relations["350"].unshift("410");
      }
      return _city.relations[pid]
        .filter((id) => _city.list[id])
        .map((id) => _city.list[id]);
    }), getCityByName: memoize((name) => {
      const searchList = getSearchList();
      let item;
      [(item) => item.name === name, (item) => item.name === name.replace(/(省|市)$/, ""), (item) => name.indexOf(item.name) === 0,].find((func) => {
        item = searchList.find(func);
        return item;
      });
      return item;
    }), combineCities: memoize((currentId, list) => {
      return [...list.filter((item) => {
        return (city.list[item].parentCode !== currentId && city.list[currentId].parentCode !== item && currentId !== item);
      }), currentId,];
    }), searchCities: memoize((value) => {
      if (!value) {
        return [];
      }
      const searchList = getSearchList();
      return searchList
        .filter((item) => {
          return ["pinyin", "name", "enName", "spelling"].some((name) => {
            return item[name].toUpperCase().indexOf(value.toUpperCase()) > -1;
          });
        })
        .map((item) => {
          const parent = item.parentCode ? city.list[item.parentCode] : null;
          return {
            label: parent ? `${parent.name}·${item.name}` : item.name, value: item.code,
          };
        });
    }),
  };
};

export default createAddressApi;
