import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { MemberController } from "./member.controller";
import { MemberValidations } from "./member.validations";

const router = Router();

router.post(
  "/",
  validateRequest(MemberValidations.createMemberValidationSchema),
  MemberController.createMember
);
router.get("/", MemberController.getAllMembers);
router.get("/:memberId", MemberController.getMemberById);

export const MemberRoutes = router;
