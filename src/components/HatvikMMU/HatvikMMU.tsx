import { FunctionComponent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
// import CurrentStatusHeader from "../CurrentStatusHeader/CurrentStatusHeader";
import MetricBox from "../MetricBox/MetricBox";
import styles from "./HatvikMMU.module.css";

export type HatvikMMUType = {
  className?: string;
};

const HatvikMMU: FunctionComponent<HatvikMMUType> = ({ className = "" }) => {
  const navigate = useNavigate();

  const onMetricBoxContainerClick = useCallback(() => {
    navigate("/kpi-graph-page-ua");
  }, [navigate]);

  const onMetricBoxContainer2Click = useCallback(() => {
    // Please sync "KPI graph page-performance" to the project
  }, []);

  const onMetricBoxContainer3Click = useCallback(() => {
    // Please sync "KPI graph page-util" to the project
  }, []);

  const onMetricBoxContainer4Click = useCallback(() => {
    // Please sync "KPI graph page-bdu" to the project
  }, []);

  const onFrameContainerClick = useCallback(() => {
    navigate("/location-info-and-downloads");
  }, [navigate]);

  const onFrameContainer2Click = useCallback(() => {
    // Please sync "All sevice needs page" to the project
  }, []);

  const onFrameContainer3Click = useCallback(() => {
    // Please sync "All alarms page" to the project
  }, []);

  const onMetricBoxContainer1Click = useCallback(() => {
    // Please sync "KPI graph page-mtbf" to the project
  }, []);

  return (
    <div className={[styles.hatvikMmu01, className].join(" ")}>
      <section className={styles.topheader}>
        <header className={styles.frameParent}>
          <div className={styles.homeiconv2Wrapper}>
            <img
              className={styles.homeiconv2}
              loading="lazy"
              alt=""
              src="/homeiconv2@2x.png"
            />
          </div>
          <div className={styles.right}>
            <img
              className={styles.magnifierIcon}
              loading="lazy"
              alt=""
              src="/magnifier.svg"
            />
            <div className={styles.profileiconWrapper}>
              <img
                className={styles.profileicon}
                loading="lazy"
                alt=""
                src="/profileicon.svg"
              />
            </div>
          </div>
        </header>
        <div className={styles.usefulllinks}>
          <div className={styles.polygonParent} onClick={onFrameContainerClick}>
            <img className={styles.frameChild} alt="" src="/polygon-1.svg" />
            <a className={styles.showQuickLinks}>Location info</a>
          </div>
        </div>
      </section>
      {/* <CurrentStatusHeader equipmentName={`hoi`}/> */}
      <section className={styles.usedTable}>
        <div className={styles.table}>
          <div className={styles.subsectionHeader}>
            <div className={styles.titleplussince}>
              <b className={styles.kpiStatistics}>Service needs</b>
              <div className={styles.sinceDropdown}>
                <div className={styles.dropdownIconWrapper}>
                  <img
                    className={styles.dropdownIcon}
                    loading="lazy"
                    alt=""
                    src="/polygon-11.svg"
                  />
                </div>
                <div className={styles.months}> 12 months</div>
              </div>
            </div>
            <div className={styles.lineframe}>
              <div className={styles.lineframeChild} />
            </div>
          </div>
          <div className={styles.tableheader}>
            <div className={styles.headercell1}>
              <div className={styles.headertextWrapper}>
                <b className={styles.headertext}>Service need</b>
              </div>
            </div>
            <div className={styles.headercell2}>
              <div className={styles.headertextContainer}>
                <b className={styles.headertext1}>Name</b>
              </div>
            </div>
            <div className={styles.headercell3}>
              <div className={styles.headertextFrame}>
                <b className={styles.headertext2}>Date</b>
              </div>
            </div>
            <div className={styles.headercell4}>
              <div className={styles.frameDiv}>
                <b className={styles.headertext3}>Status</b>
              </div>
            </div>
            <div className={styles.headercell5}>
              <div className={styles.headertextWrapper1}>
                <b className={styles.headertext4}>HeaderText</b>
              </div>
            </div>
            <div className={styles.headercell6}>
              <div className={styles.headertextWrapper2}>
                <b className={styles.headertext5}>HeaderText</b>
              </div>
            </div>
          </div>
          <img
            className={styles.tableChild}
            loading="lazy"
            alt=""
            src="/line-141.svg"
          />
          <div className={styles.tablerow0}>
            <div className={styles.tablecell1}>
              <div className={styles.serviceiconParent}>
                <img
                  className={styles.serviceicon}
                  alt=""
                  src="/serviceicon.svg"
                />
                <div className={styles.celltext}>SN00201</div>
              </div>
            </div>
            <div className={styles.tablecell2}>
              <div className={styles.celltextWrapper}>
                <div className={styles.celltext1}>C3 f</div>
              </div>
            </div>
            <div className={styles.tablecell3}>
              <div className={styles.celltextContainer}>
                <div className={styles.celltext2}> 7 Jan 2024 18:20:26</div>
              </div>
            </div>
            <div className={styles.tablecell4}>
              <div className={styles.celltextFrame}>
                <div className={styles.celltext3}>Completed</div>
              </div>
            </div>
            <div className={styles.tablecell5}>
              <div className={styles.celltextWrapper1}>
                <div className={styles.celltext4}>CellText_5</div>
              </div>
            </div>
            <div className={styles.tablecell51}>
              <div className={styles.celltextWrapper2}>
                <div className={styles.celltext5}>CellText_6</div>
              </div>
            </div>
          </div>
          <div className={styles.tablerow1}>
            <div className={styles.tablecell11}>
              <div className={styles.serviceiconGroup}>
                <img
                  className={styles.serviceicon1}
                  alt=""
                  src="/serviceicon-1.svg"
                />
                <div className={styles.celltext6}>SN00001</div>
              </div>
            </div>
            <div className={styles.tablecell21}>
              <div className={styles.firstTableFirstValuesWrapper}>
                <div className={styles.firstTableFirst}>
                  C3 fails consistency during arming
                </div>
              </div>
            </div>
            <div className={styles.tablecell31}>
              <div className={styles.firstTableSecondValuesWrapper}>
                <div className={styles.firstTableSecond}>
                  {" "}
                  14 May 2024 23:44:42
                </div>
              </div>
            </div>
            <div className={styles.tablecell41}>
              <div className={styles.firstTableThirdValuesWrapper}>
                <div className={styles.firstTableThird}>Active</div>
              </div>
            </div>
            <div className={styles.tablecell52}>
              <div className={styles.celltextWrapper3}>
                <div className={styles.celltext7}>CellText_5</div>
              </div>
            </div>
            <div className={styles.tablecell53}>
              <div className={styles.celltextWrapper4}>
                <div className={styles.celltext8}>CellText_6</div>
              </div>
            </div>
          </div>
          <div className={styles.tablerow2}>
            <div className={styles.tablecell12}>
              <div className={styles.serviceiconContainer}>
                <img
                  className={styles.serviceicon2}
                  alt=""
                  src="/serviceicon-2.svg"
                />
                <div className={styles.celltext9}>SN00283</div>
              </div>
            </div>
            <div className={styles.tablecell22}>
              <div className={styles.celltextWrapper5}>
                <div className={styles.celltext10}>
                  C3 fails randomly during arming
                </div>
              </div>
            </div>
            <div className={styles.tablecell32}>
              <div className={styles.celltextWrapper6}>
                <div className={styles.celltext11}> 19 May 2024 17:33:42</div>
              </div>
            </div>
            <div className={styles.tablecell42}>
              <div className={styles.celltextWrapper7}>
                <div className={styles.celltext12}>Active</div>
              </div>
            </div>
            <div className={styles.tablecell54}>
              <div className={styles.celltextWrapper8}>
                <div className={styles.celltext13}>CellText_5</div>
              </div>
            </div>
            <div className={styles.tablecell55}>
              <div className={styles.celltextWrapper9}>
                <div className={styles.celltext14}>CellText_6</div>
              </div>
            </div>
          </div>
          <div className={styles.tablerow3}>
            <div className={styles.tablecell13}>
              <div className={styles.serviceiconParent1}>
                <img
                  className={styles.serviceicon3}
                  alt=""
                  src="/serviceicon.svg"
                />
                <div className={styles.celltext15}>SN00020</div>
              </div>
            </div>
            <div className={styles.tablecell23}>
              <div className={styles.celltextWrapper10}>
                <div className={styles.celltext16}>C1A check valve faulty</div>
              </div>
            </div>
            <div className={styles.tablecell33}>
              <div className={styles.celltextWrapper11}>
                <div className={styles.celltext17}>26 Dec 2023 14:20:53</div>
              </div>
            </div>
            <div className={styles.tablecell43}>
              <div className={styles.celltextWrapper12}>
                <div className={styles.celltext18}>Postponed</div>
              </div>
            </div>
            <div className={styles.tablecell56}>
              <div className={styles.celltextWrapper13}>
                <div className={styles.celltext19}>CellText_5</div>
              </div>
            </div>
            <div className={styles.tablecell57}>
              <div className={styles.celltextWrapper14}>
                <div className={styles.celltext20}>CellText_6</div>
              </div>
            </div>
          </div>
          <div className={styles.tablerow4}>
            <div className={styles.tablecell14}>
              <div className={styles.serviceiconParent2}>
                <img
                  className={styles.serviceicon4}
                  alt=""
                  src="/serviceicon.svg"
                />
                <div className={styles.celltext21}>SN00005</div>
              </div>
            </div>
            <div className={styles.tablecell24}>
              <div className={styles.celltextWrapper15}>
                <div className={styles.celltext22}>C3A check valve faulty</div>
              </div>
            </div>
            <div className={styles.tablecell34}>
              <div className={styles.celltextWrapper16}>
                <div className={styles.celltext23}>30 Nov 2023 11:18:23</div>
              </div>
            </div>
            <div className={styles.tablecell44}>
              <div className={styles.celltextWrapper17}>
                <div className={styles.celltext24}>Cancelled</div>
              </div>
            </div>
            <div className={styles.tablecell58}>
              <div className={styles.celltextWrapper18}>
                <div className={styles.celltext25}>CellText_5</div>
              </div>
            </div>
            <div className={styles.tablecell59}>
              <div className={styles.celltextWrapper19}>
                <div className={styles.celltext26}>CellText_6</div>
              </div>
            </div>
          </div>
          <div className={styles.tablerow5}>
            <div className={styles.tablecell15}>
              <div className={styles.serviceiconParent3}>
                <div className={styles.serviceicon5}>
                  <img
                    className={styles.image18Icon}
                    alt=""
                    src="/image-18@2x.png"
                  />
                  <div className={styles.image27} />
                  <div className={styles.sWrapper}>
                    <div className={styles.s}>s</div>
                  </div>
                </div>
                <div className={styles.celltext27}>SN00001</div>
              </div>
            </div>
            <div className={styles.tablecell25}>
              <div className={styles.celltextWrapper20}>
                <div className={styles.celltext28}>CellText_2</div>
              </div>
            </div>
            <div className={styles.tablecell35}>
              <div className={styles.celltextWrapper21}>
                <div className={styles.celltext29}>CellText_3</div>
              </div>
            </div>
            <div className={styles.tablecell45}>
              <div className={styles.celltextWrapper22}>
                <div className={styles.celltext30}>CellText_4</div>
              </div>
            </div>
            <div className={styles.tablecell510}>
              <div className={styles.celltextWrapper23}>
                <div className={styles.celltext31}>CellText_5</div>
              </div>
            </div>
            <div className={styles.tablecell511}>
              <div className={styles.celltextWrapper24}>
                <div className={styles.celltext32}>CellText_6</div>
              </div>
            </div>
          </div>
          <div
            className={styles.show5MoreParent}
            onClick={onFrameContainer2Click}
          >
            <b className={styles.show5More}>Show more</b>
            <div className={styles.showMoreIconWrapper}>
              <img
                className={styles.showMoreIcon}
                loading="lazy"
                alt=""
                src="/vector-18.svg"
              />
            </div>
          </div>
        </div>
      </section>
      <div className={styles.servicecallsexplabanionWrapper}>
        <div className={styles.servicecallsexplabanion}>
          <div className={styles.tablecell}>
            <div className={styles.serviceiconParent4}>
              <img
                className={styles.serviceicon6}
                alt=""
                src="/serviceicon.svg"
              />
              <div className={styles.celltext33}>Planned service</div>
            </div>
          </div>
          <div className={styles.tablecell6}>
            <div className={styles.serviceiconParent5}>
              <img
                className={styles.serviceicon7}
                alt=""
                src="/serviceicon-2.svg"
              />
              <div className={styles.celltext34}>Urgent service</div>
            </div>
          </div>
          <div className={styles.tablecell7}>
            <div className={styles.serviceiconParent6}>
              <img
                className={styles.serviceicon8}
                alt=""
                src="/serviceicon-1.svg"
              />
              <div className={styles.celltext35}>Immediate service</div>
            </div>
          </div>
        </div>
      </div>
      <footer className={styles.usedTable1}>
        <div className={styles.table1}>
          <div className={styles.subsectionHeader1}>
            <div className={styles.titleplussince1}>
              <b className={styles.kpiStatistics1}>Active alarms</b>
            </div>
            <div className={styles.lineframe1}>
              <div className={styles.lineframeItem} />
            </div>
          </div>
          <div className={styles.tableheader1}>
            <div className={styles.headercell11}>
              <div className={styles.headertextWrapper3}>
                <b className={styles.headertext6}>Date/time</b>
              </div>
            </div>
            <div className={styles.headercell21}>
              <div className={styles.headertextWrapper4}>
                <b className={styles.headertext7}>Alarm</b>
              </div>
            </div>
            <div className={styles.headercell31}>
              <div className={styles.headertextWrapper5}>
                <b className={styles.headertext8}>Priority</b>
              </div>
            </div>
            <div className={styles.headercell41}>
              <div className={styles.headertextWrapper6}>
                <b className={styles.headertext9}>Duration</b>
              </div>
            </div>
            <div className={styles.headercell51}>
              <div className={styles.headertextWrapper7}>
                <b className={styles.headertext10}>HeaderText</b>
              </div>
            </div>
            <div className={styles.headercell61}>
              <div className={styles.headertextWrapper8}>
                <b className={styles.headertext11}>HeaderText</b>
              </div>
            </div>
          </div>
          <img className={styles.tableItem} alt="" src="/line-141.svg" />
          <div className={styles.tablerow01}>
            <div className={styles.tablecell16}>
              <div className={styles.celltextWrapper25}>
                <div className={styles.celltext36}>14 May 2024, 23:44:34</div>
              </div>
            </div>
            <div className={styles.tablecell26}>
              <div className={styles.celltextWrapper26}>
                <div className={styles.celltext37}>
                  U1/Alm1:/alm:U1 Check C3 Failed
                </div>
              </div>
            </div>
            <div className={styles.tablecell36}>
              <div className={styles.celltextWrapper27}>
                <div className={styles.celltext38}>Critical</div>
              </div>
            </div>
            <div className={styles.tablecell46}>
              <div className={styles.celltextWrapper28}>
                <div className={styles.celltext39}>5hrs 15min</div>
              </div>
            </div>
            <div className={styles.tablecell512}>
              <div className={styles.celltextWrapper29}>
                <div className={styles.celltext40}>CellText_5</div>
              </div>
            </div>
            <div className={styles.tablecell513}>
              <div className={styles.celltextWrapper30}>
                <div className={styles.celltext41}>CellText_6</div>
              </div>
            </div>
          </div>
          <div className={styles.tablerow11}>
            <div className={styles.tablecell17}>
              <div className={styles.celltextWrapper31}>
                <div className={styles.celltext42}> 10 May 2024, 17:33:34</div>
              </div>
            </div>
            <div className={styles.tablecell27}>
              <div className={styles.celltextWrapper32}>
                <div className={styles.celltext43}>
                  U1_EM_C3/Alm1:/Alm:U1 C3 Faied to Extend
                </div>
              </div>
            </div>
            <div className={styles.tablecell37}>
              <div className={styles.celltextWrapper33}>
                <div className={styles.celltext44}>High</div>
              </div>
            </div>
            <div className={styles.tablecell47}>
              <div className={styles.celltextWrapper34}>
                <div className={styles.celltext45}>4 days 11 hrs</div>
              </div>
            </div>
            <div className={styles.tablecell514}>
              <div className={styles.celltextWrapper35}>
                <div className={styles.celltext46}>CellText_5</div>
              </div>
            </div>
            <div className={styles.tablecell515}>
              <div className={styles.celltextWrapper36}>
                <div className={styles.celltext47}>CellText_6</div>
              </div>
            </div>
          </div>
          <div className={styles.tablerow21}>
            <div className={styles.tablecell18}>
              <div className={styles.celltextWrapper37}>
                <div className={styles.celltext48}> 20 Apr 2024, 21:56:45</div>
              </div>
            </div>
            <div className={styles.tablecell28}>
              <div className={styles.celltextWrapper38}>
                <div className={styles.celltext49}>
                  U1/Alm1:/alm:U1 Parking C3 Failed to Pre park
                </div>
              </div>
            </div>
            <div className={styles.tablecell38}>
              <div className={styles.celltextWrapper39}>
                <div className={styles.celltext50}>High</div>
              </div>
            </div>
            <div className={styles.tablecell48}>
              <div className={styles.celltextWrapper40}>
                <div className={styles.celltext51}>20 days</div>
              </div>
            </div>
            <div className={styles.tablecell516}>
              <div className={styles.celltextWrapper41}>
                <div className={styles.celltext52}>CellText_5</div>
              </div>
            </div>
            <div className={styles.tablecell517}>
              <div className={styles.celltextWrapper42}>
                <div className={styles.celltext53}>CellText_6</div>
              </div>
            </div>
          </div>
          <div className={styles.tablerow31}>
            <div className={styles.tablecell19}>
              <div className={styles.celltextWrapper43}>
                <div className={styles.celltext54}> 9 Jan 2024, 04:50:23</div>
              </div>
            </div>
            <div className={styles.tablecell29}>
              <div className={styles.celltextWrapper44}>
                <div className={styles.celltext55}>Mooring Failed</div>
              </div>
            </div>
            <div className={styles.tablecell39}>
              <div className={styles.celltextWrapper45}>
                <div className={styles.celltext56}>49 min</div>
              </div>
            </div>
            <div className={styles.tablecell49}>
              <div className={styles.celltextWrapper46}>
                <div className={styles.celltext57}>Med</div>
              </div>
            </div>
            <div className={styles.tablecell518}>
              <div className={styles.celltextWrapper47}>
                <div className={styles.celltext58}>CellText_5</div>
              </div>
            </div>
            <div className={styles.tablecell519}>
              <div className={styles.celltextWrapper48}>
                <div className={styles.celltext59}>CellText_6</div>
              </div>
            </div>
          </div>
          <div className={styles.tablerow41}>
            <div className={styles.tablecell110}>
              <div className={styles.celltextWrapper49}>
                <div className={styles.celltext60}> 9 Jan 2024, 04:01:18</div>
              </div>
            </div>
            <div className={styles.tablecell210}>
              <div className={styles.celltextWrapper50}>
                <div className={styles.celltext61}>Vacuum pressure low</div>
              </div>
            </div>
            <div className={styles.tablecell310}>
              <div className={styles.celltextWrapper51}>
                <div className={styles.celltext62}>11 min</div>
              </div>
            </div>
            <div className={styles.tablecell410}>
              <div className={styles.celltextWrapper52}>
                <div className={styles.celltext63}>Low</div>
              </div>
            </div>
            <div className={styles.tablecell520}>
              <div className={styles.celltextWrapper53}>
                <div className={styles.celltext64}>CellText_5</div>
              </div>
            </div>
            <div className={styles.tablecell521}>
              <div className={styles.celltextWrapper54}>
                <div className={styles.celltext65}>CellText_6</div>
              </div>
            </div>
          </div>
          <div className={styles.tablerow51}>
            <div className={styles.tablecell111}>
              <div className={styles.celltextWrapper55}>
                <div className={styles.celltext66}>CellText_1</div>
              </div>
            </div>
            <div className={styles.tablecell211}>
              <div className={styles.celltextWrapper56}>
                <div className={styles.celltext67}>CellText_2</div>
              </div>
            </div>
            <div className={styles.tablecell311}>
              <div className={styles.celltextWrapper57}>
                <div className={styles.celltext68}>CellText_3</div>
              </div>
            </div>
            <div className={styles.tablecell411}>
              <div className={styles.celltextWrapper58}>
                <div className={styles.celltext69}>CellText_4</div>
              </div>
            </div>
            <div className={styles.tablecell522}>
              <div className={styles.celltextWrapper59}>
                <div className={styles.celltext70}>CellText_5</div>
              </div>
            </div>
            <div className={styles.tablecell523}>
              <div className={styles.celltextWrapper60}>
                <div className={styles.celltext71}>CellText_6</div>
              </div>
            </div>
          </div>
          <div
            className={styles.show5MoreGroup}
            onClick={onFrameContainer3Click}
          >
            <b className={styles.show5More1}>Show more</b>
            <div className={styles.vectorWrapper}>
              <img className={styles.frameItem} alt="" src="/vector-18.svg" />
            </div>
          </div>
        </div>
      </footer>
      <section className={styles.kpiplusheader}>
        <div className={styles.subsectionHeader2}>
          <div className={styles.titleplussince2}>
            <b className={styles.kpiStatistics2}>KPI Statistics</b>
            <div className={styles.sinceDropdown1}>
              <div className={styles.dropdownIcon1}>
                <img className={styles.icon} alt="" src="/polygon-11.svg" />
              </div>
              <div className={styles.months1}> 12 months</div>
            </div>
          </div>
          <div className={styles.separator}>
            <div className={styles.separatorChild} />
          </div>
        </div>
        <div className={styles.kpiBox}>
          <MetricBox
            unitAvailability="Unit availability"
            metricValue="95%"
            onMetricBoxContainerClick={onMetricBoxContainerClick}
          />
          <div
            className={styles.metricBox}
            onClick={onMetricBoxContainer1Click}
          >
            <div className={styles.metricBoxChild} />
            <b className={styles.unitAvailability}>Unit MTBF</b>
            <b className={styles.b}>14,6 days</b>
          </div>
          <MetricBox
            unitAvailability="Unit performance"
            metricValue="98%"
            onMetricBoxContainerClick={onMetricBoxContainer2Click}
          />
          <MetricBox
            unitAvailability="Unit utilization"
            metricValue="99%"
            onMetricBoxContainerClick={onMetricBoxContainer3Click}
          />
          <MetricBox
            unitAvailability="BDU availability"
            metricValue="97%"
            onMetricBoxContainerClick={onMetricBoxContainer4Click}
          />
          <div className={styles.navigation}>
            <div className={styles.doubleArrow}>
              <div className={styles.singleArrowright}>
                <img
                  className={styles.singleArrowrightChild}
                  loading="lazy"
                  alt=""
                  src="/vector-20.svg"
                />
                <img
                  className={styles.singleArrowrightItem}
                  loading="lazy"
                  alt=""
                  src="/vector-20.svg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HatvikMMU;