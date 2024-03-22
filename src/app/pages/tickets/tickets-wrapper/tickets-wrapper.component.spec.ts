import { ComponentFixture, TestBed } from "@angular/core/testing";

import { TicketsWrapperComponent } from "./tickets-wrapper.component";
import {
  MockStore,
  createMockStore,
  provideMockStore,
} from "@ngrx/store/testing";
import { getLoadingState } from "src/app/store/app-config/app-config.selectors";
import { ITicket } from "src/app/store/ticket/ticket.model";
import { TicketActions } from "src/app/store/ticket/ticket.actions";
import { mockTickets } from "src/app/tests/tests.mocks";

describe("TicketsWrapperComponent", () => {
  let component: TicketsWrapperComponent;
  let fixture: ComponentFixture<TicketsWrapperComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketsWrapperComponent],
      providers: [
        provideMockStore({
          selectors: [
            {
              selector: getLoadingState,
              value: true,
            },
          ],
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TicketsWrapperComponent);
    component = fixture.componentInstance;
    store = createMockStore({});
    fixture.detectChanges();

    store = TestBed.inject(MockStore);
    spyOn(store, "dispatch").and.callThrough();
  });

  it("should create component", () => {
    expect(component).toBeTruthy();
  });

  it("isLoading$: should get the loading value from selector", (done) => {
    store.select(getLoadingState).subscribe((value) => {
      expect(value).toBeTruthy();
      done();
    });
  });

  it("addNewTicket(): should dispatch add Ticket action", () => {
    component.addNewTicket(mockTickets[0]);
    expect(store.dispatch).toHaveBeenCalledWith(
      TicketActions.addTicket({ ticket: mockTickets[0] })
    );
  });
});
